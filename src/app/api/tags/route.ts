import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
	const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });
	return NextResponse.json({ tags });
}

export async function POST(req: NextRequest) {
	const json = await req.json().catch(() => null);
	if (!json?.name) return NextResponse.json({ message: "Invalid input" }, { status: 400 });
	const name = String(json.name);
	const slug = slugify(name, { lower: true, strict: true });
	const exists = await prisma.tag.findFirst({ where: { OR: [{ name }, { slug }] } });
	if (exists) return NextResponse.json({ message: "Tag exists" }, { status: 409 });
	const tag = await prisma.tag.create({ data: { name, slug } });
	return NextResponse.json({ tag }, { status: 201 });
}
