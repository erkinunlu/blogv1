import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export async function POST(req: Request) {
	const json = await req.json().catch(() => null);
	const parsed = schema.safeParse(json);
	if (!parsed.success) {
		return NextResponse.json({ message: "Invalid input" }, { status: 400 });
	}
	const { email, password } = parsed.data;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
	}
	const ok = await comparePassword(password, user.passwordHash);
	if (!ok) {
		return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
	}
	const token = signToken({ userId: String(user.id), role: user.role as any, email: user.email });
	const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
	res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });
	return res;
}
