import { PortalFrame } from "@/components/portal-frame";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalFrame>{children}</PortalFrame>;
}
