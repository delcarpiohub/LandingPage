import type { Metadata } from "next";
import { Azeret_Mono, Geist, Geologica } from "next/font/google";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instrumentación analítica HPLC y GC | Del Carpio Análisis y Asesorías",
  description:
    "Cromatografía analítica HPLC y GC para alimentos, minería, farmacéutica, aguas, ambiental y academia. Validación de métodos, mantención y proyectos de laboratorio completo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geologica.variable} ${geist.variable} ${azeretMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
