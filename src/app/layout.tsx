import "@/constants/globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Forest BBS",
  description: "Forest BBS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
