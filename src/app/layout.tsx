import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Math Notes Testing App",
  description:
    "Take notes with Markdown, images, math equations and code blocks. Made by Khao from khaodoes.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
					<div className="absolute top-0 right-0 flex items-center gap-2 p-4 text-sm">
						<ThemeToggle />
					</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
