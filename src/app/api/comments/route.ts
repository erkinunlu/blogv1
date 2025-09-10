import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
	postId: z.number(),
	name: z.string().min(2),
	email: z.string().email(),
	content: z.string().min(3),
});

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const postId = searchParams.get("postId");
	const comments = await prisma.comment.findMany({
		where: { approved: true, ...(postId ? { postId: Number(postId) } : {}) },
		orderBy: { createdAt: "desc" },
	});
	return NextResponse.json({ comments });
}

export async function POST(req: NextRequest) {
	const json = await req.json().catch(() => null);
	const parsed = schema.safeParse(json);
	if (!parsed.success) return NextResponse.json({ message: "Invalid input" }, { status: 400 });
	const comment = await prisma.comment.create({ data: { ...parsed.data, approved: false } });
	return NextResponse.json({ comment }, { status: 201 });
}
