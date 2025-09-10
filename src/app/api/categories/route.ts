import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/authMiddleware";

const schema = z.object({ name: z.string().min(2) });

export async function GET() {
	const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
	return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	const json = await req.json().catch(() => null);
	const parsed = schema.safeParse(json);
	if (!parsed.success) return NextResponse.json({ message: "Invalid input" }, { status: 400 });
	const name = parsed.data.name.trim();
	const slug = slugify(name, { lower: true, strict: true });
	const exists = await prisma.category.findFirst({ where: { OR: [{ name }, { slug }] } });
	if (exists) return NextResponse.json({ message: "Category exists" }, { status: 409 });
	const category = await prisma.category.create({ data: { name, slug } });
	return NextResponse.json({ category }, { status: 201 });
}
