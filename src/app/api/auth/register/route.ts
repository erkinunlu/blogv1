import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";

const schema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
});

export async function POST(req: Request) {
	const json = await req.json().catch(() => null);
	const parsed = schema.safeParse(json);
	if (!parsed.success) {
		return NextResponse.json({ message: "Invalid input" }, { status: 400 });
	}
	const { name, email, password } = parsed.data;
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		return NextResponse.json({ message: "Email already in use" }, { status: 409 });
	}
	const passwordHash = await hashPassword(password);
	const user = await prisma.user.create({ data: { name, email, passwordHash, role: "admin" } });
	const token = signToken({ userId: String(user.id), role: user.role as any, email: user.email });
	const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
	res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });
	return res;
}
