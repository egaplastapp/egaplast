import { V2PortalFrame } from "@/components/v2/portal-frame";

export const metadata = { title: "Portal" };

export default function V2PortalLayout({ children }: { children: React.ReactNode }) {
  return <V2PortalFrame>{children}</V2PortalFrame>;
}
