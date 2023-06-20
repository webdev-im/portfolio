import "./globals.css";

import { Ubuntu } from "@next/font/google";

export const ubuntu = Ubuntu({
  subsets: ["cyrillic"],
  weight: "300",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
