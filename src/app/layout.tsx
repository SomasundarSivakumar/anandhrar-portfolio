import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anantharaj B | .NET Developer Portfolio | C# | WPF | SQL",
  description: "Portfolio of Anantharaj B — Software Engineer with 4+ years of experience in .NET, C#, WPF, and SQL. Currently at Titan Engineering & Automation Limited (TATA), Hosur, Tamil Nadu.",
  keywords: [".NET Developer", "C#", "WPF", "SQL Server", "ASP.NET Core", "Anantharaj B", "Software Engineer", "Hosur", "Tamil Nadu", "Titan Engineering", "IDS Next"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} dark antialiased`}>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
        <SmoothScrollProvider>
          <div className="w-full overflow-x-hidden relative flex flex-col">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
