import type { ReactNode } from "react";

export const metadata = {
  title: "Clickstream Analytics",
  description: "Self-built clickstream analytics dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>{children}</body>
    </html>
  );
}
