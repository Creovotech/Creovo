import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ViewTransitions } from "next-view-transitions";
import { AppNavbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import { LenisProvider } from "@/providers/lenis-provider";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Creovo",
  description: "Creovo is a team who creates awesome web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <LenisProvider>
        <div
          className={cn(
            inter.className,
            'bg-charcoal antialiased h-full w-full'
          )}
        >
          <ViewTransitions >
            {/* <AppNavbar /> */}
            {children}
            <Footer />
          </ViewTransitions>
        </div>
        </LenisProvider>
      </body>
    </html>
  );
}
