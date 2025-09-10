import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export function requireAuth(req: NextRequest, roles?: Array<"admin" | "editor" | "user">) {
	const token = getTokenFromRequest(req);
	if (!token) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const payload = verifyToken(token);
	if (!payload) {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}
	if (roles && roles.length > 0 && !roles.includes(payload.role)) {
		return NextResponse.json({ message: "Forbidden" }, { status: 403 });
	}
	// Geçerli ise payload'ı header ile sonraki handler'a aktaralım
	const res = NextResponse.next();
	res.headers.set("x-user-id", payload.userId);
	res.headers.set("x-user-role", payload.role);
	res.headers.set("x-user-email", payload.email);
	return res;
}
