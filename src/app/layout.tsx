import { Header } from "@/components/header";
import "./globals.css";
import { ImportExportDropdown } from "@/components/import-export-dropdown";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen flex flex-col container mx-auto pb-8">
          <Header />
          <ImportExportDropdown />
          {children}
        </div>
      </body>
    </html>
  );
}
