import "@/constants/globals.css";

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
