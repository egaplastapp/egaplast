import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { DemoProvider } from "@/lib/demo-store";
import { PrototypeBanner } from "@/components/prototype-banner";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "EGAPLAST | Mecanismos para caixa acoplada e produtos hidrossanitários",
    template: "%s | EGAPLAST",
  },
  description:
    "Fabricante de mecanismos para caixa acoplada e produtos hidrossanitários, em Brasília, desde 1999. Condição comercial sob consulta.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full`}>
      <body className="min-h-full bg-white text-ink antialiased">
        <DemoProvider>
          <PrototypeBanner />
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
