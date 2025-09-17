import "@/constants/globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "BBS Training",
  description: "Next.js + Bun + Hono サンプル",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
