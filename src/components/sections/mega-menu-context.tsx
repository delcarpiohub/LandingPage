"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { MegaMenuScope } from "@/content/mega-menu-data";

const MegaMenuContext = createContext<MegaMenuScope[] | null>(null);

export function MegaMenuProvider({
  scopes,
  children,
}: {
  scopes: MegaMenuScope[];
  children: ReactNode;
}) {
  return <MegaMenuContext.Provider value={scopes}>{children}</MegaMenuContext.Provider>;
}

export function useMegaMenuScopes() {
  const scopes = useContext(MegaMenuContext);
  if (!scopes) throw new Error("MegaMenuProvider debe envolver Navigation");
  return scopes;
}
