import { Navbar } from "@/components/navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col justify-start container mx-auto">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
