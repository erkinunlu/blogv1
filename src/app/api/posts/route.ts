import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/authMiddleware";

const schema = z.object({
	title: z.string().min(3),
	excerpt: z.string().optional(),
	content: z.string().min(10),
	coverImage: z.string().url().optional(),
	categories: z.array(z.string()).default([]),
	published: z.boolean().default(false),
});

function getUserIdFromAuthResponse(res: NextResponse | undefined): number | null {
	try {
		const id = (res as NextResponse).headers.get("x-user-id");
		return id ? Number(id) : null;
	} catch {
		return null;
	}
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const q = searchParams.get("q") || "";
	const category = searchParams.get("category");

	const where = {
		AND: [
			q
				? {
					OR: [
						{ title: { contains: q } },
						{ excerpt: { contains: q } },
					],
				}
				: {},
			category ? { categories: { some: { slug: category } } } : {},
		],
	} as const;

	const posts = await prisma.post.findMany({
		where,
		include: { categories: true, author: { select: { id: true, name: true, email: true } } },
		orderBy: { createdAt: "desc" },
		take: 50,
	});
	return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	const json = await req.json().catch(() => null);
	const parsed = schema.safeParse(json);
	if (!parsed.success) return NextResponse.json({ message: "Invalid input" }, { status: 400 });
	const { title, excerpt, content, coverImage, categories, published } = parsed.data;
	const slug = slugify(title, { lower: true, strict: true });
	const exists = await prisma.post.findUnique({ where: { slug } });
	if (exists) return NextResponse.json({ message: "Post exists" }, { status: 409 });
	const userId = getUserIdFromAuthResponse(authRes as unknown as NextResponse);
	if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	const post = await prisma.post.create({
		data: {
			title,
			slug,
			excerpt,
			content,
			coverImage,
			published,
			publishedAt: published ? new Date() : null,
			authorId: userId,
			categories: { connect: categories.map((id) => ({ id: Number(id) })) },
		},
		include: { categories: true },
	});
	return NextResponse.json({ post }, { status: 201 });
}
