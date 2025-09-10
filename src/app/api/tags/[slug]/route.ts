import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, context: { params: Promise<{ slug: string }> }) {
	const { slug } = await context.params;
	await prisma.tag.delete({ where: { slug } });
	return NextResponse.json({ message: "Deleted" });
}
