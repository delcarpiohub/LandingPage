import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.redirect(
    new URL("/productos/thermo-dionex-ase-350", request.url),
    301,
  );
}

export const config = {
  matcher: "/productos/thermo-dionex-ase-celdas",
};
