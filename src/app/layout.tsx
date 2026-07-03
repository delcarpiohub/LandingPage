import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { company, industries } from "@/content/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.delcarpio.cl"),
  title: "Instrumentación analítica HPLC y GC | Del Carpio Análisis y Asesorías",
  description:
    "Cromatografía HPLC y GC para alimentos, minería, farmacéutica, aguas, ambiental y academia. Validación de métodos, mantención y proyectos de laboratorio.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Instrumentación analítica HPLC y GC | Del Carpio",
    description:
      "Implementación, validación y soporte de sistemas HPLC y GC para laboratorios industriales en Chile.",
    url: "https://www.delcarpio.cl",
    siteName: "Del Carpio Análisis y Asesorías",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/brand/del-carpio-dark.png",
        width: 3694,
        height: 821,
        alt: "Logo Del Carpio Análisis y Asesorías",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instrumentación analítica HPLC y GC | Del Carpio",
    description:
      "Implementación, validación y soporte de sistemas HPLC y GC para laboratorios industriales en Chile.",
    images: ["/brand/del-carpio-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    url: "https://www.delcarpio.cl",
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      addressLocality: company.addressLocality,
      addressRegion: company.addressRegion,
      postalCode: company.postalCode,
      addressCountry: company.addressCountry,
    },
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
    description:
      "Implementación, validación y soporte de sistemas HPLC y GC para laboratorios industriales en Chile.",
    knowsAbout: [
      "HPLC",
      "GC",
      "Validación de métodos",
      "IQ/OQ/PQ",
      "NCh-ISO 17025",
      "Cromatografía analítica",
    ],
    serviceType: industries.map((industry) => industry.name),
  };

  return (
    <html
      lang="es"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
