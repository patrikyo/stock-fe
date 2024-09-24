  import type { Metadata } from "next";
  import { Inter } from "next/font/google";
  import "./globals.css";

  import "@fortawesome/fontawesome-svg-core/styles.css";
  import { config } from "@fortawesome/fontawesome-svg-core";
  import Header from "@/app/components/header/header";

  config.autoAddCss = false;

  const inter = Inter({ subsets: ["latin"] });


  export const metadata: Metadata = {
    title: "Börsdata",
    description: "Vissar börsdata för special sit aktier",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={inter.className}><Header/>{children}</body>
      </html>
    );
  }
