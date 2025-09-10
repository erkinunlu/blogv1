import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/authMiddleware";

const updateSchema = z.object({
	title: z.string().min(3).optional(),
	excerpt: z.string().optional(),
	content: z.string().min(10).optional(),
	coverImage: z.string().url().optional(),
	categories: z.array(z.number()).optional(),
	published: z.boolean().optional(),
});

export async function GET(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
	const { slug } = await context.params;
	const post = await prisma.post.findUnique({
		where: { slug },
		include: { categories: true, author: { select: { id: true, name: true, email: true } } },
	});
	if (!post) return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	const { slug } = await context.params;
	const json = await req.json().catch(() => null);
	const parsed = updateSchema.safeParse(json);
	if (!parsed.success) return NextResponse.json({ message: "Invalid input" }, { status: 400 });
	const data = parsed.data;
	const updated = await prisma.post.update({
		where: { slug },
		data: {
			...("published" in data ? { published: data.published, publishedAt: data.published ? new Date() : null } : {}),
			...("title" in data ? { title: data.title! } : {}),
			...("excerpt" in data ? { excerpt: data.excerpt } : {}),
			...("content" in data ? { content: data.content! } : {}),
			...("coverImage" in data ? { coverImage: data.coverImage } : {}),
			...("categories" in data && data.categories ? { categories: { set: data.categories.map((id) => ({ id })) } } : {}),
		},
		include: { categories: true },
	});
	return NextResponse.json({ post: updated });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	const { slug } = await context.params;
	await prisma.post.delete({ where: { slug } });
	return NextResponse.json({ message: "Deleted" });
}
