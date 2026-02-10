import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plasmic Host",
};

export default function PlasmicHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

