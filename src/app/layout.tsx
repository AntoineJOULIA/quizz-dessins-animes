import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="min-h-screen grid place-content-center bg-gray-100 text-gray-900"
      >
        {children}
      </body>
    </html>
  );
}
