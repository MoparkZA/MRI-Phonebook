import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                href="/"
                className="text-2xl font-bold hover:text-gray-200 transition-colors"
              >
                Phonebook
              </Link>
              <Link
                href="/contacts/new"
                className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto text-center"
              >
                Add Contact
              </Link>
            </div>
          </div>
        </nav>
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
      </body>
    </html>
  );
}
