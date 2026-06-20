import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "./_components/nav";
import { Footer } from "./_components/footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://creovo.dev"),
  title: "Creovo — Premium websites, hand-built in weeks",
  description:
    "Creovo is a small, senior web studio. We hand-build fast, custom, conversion-focused websites in about four weeks — for businesses that refuse to look average.",
  openGraph: {
    title: "Creovo — Premium websites, hand-built in weeks",
    description:
      "A small, senior studio. You brief the people who design and code it — and about four weeks later you ship a site that makes your business look like the leader in its market.",
    url: "https://creovo.dev",
    siteName: "Creovo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
