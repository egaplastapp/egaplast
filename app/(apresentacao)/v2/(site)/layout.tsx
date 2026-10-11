import { V2Footer, V2Header } from "@/components/v2/public-chrome";

export default function V2SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <V2Header />
      <main className="flex-1">{children}</main>
      <V2Footer />
    </div>
  );
}
