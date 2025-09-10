import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/authMiddleware";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	const { id } = await context.params;
	const comment = await prisma.comment.update({ where: { id: Number(id) }, data: { approved: true } });
	return NextResponse.json({ comment });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	const { id } = await context.params;
	await prisma.comment.delete({ where: { id: Number(id) } });
	return NextResponse.json({ message: "Deleted" });
}
