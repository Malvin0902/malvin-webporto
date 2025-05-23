import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Malvin Muhammad Raqin | Junior Full Stack Developer",
  description: "Portfolio of Malvin Muhammad Raqin, a Junior Full Stack Developer. Explore my projects, skills, and experiences in web development and software engineering.",
  keywords: [
    "Malvin Muhammad Raqin",
    "Malvin Muhammad",
    "Malvin Raqin",
    "Malvin",
    "developer portfolio",
    "web developer",
    "software engineer",
    "full stack developer",
    "react developer",
    "typescript",
    "junior developer",
  ],
  authors: [{ name: "Malvin Muhammad Raqin" }],
  creator: "Malvin Muhammad Raqin",
  metadataBase: new URL('https://malvinraqin.tech'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://malvinraqin.tech",
    title: "Malvin Muhammad Raqin | Junior Full Stack Developer",
    description: "Portfolio of Malvin Muhammad Raqin, a Junior Full Stack Developer. Explore my projects, skills, and experiences in web development and software engineering.",
    siteName: "Malvin Muhammad Raqin's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malvin Muhammad Raqin | Junior Full Stack Developer",
    description: "Portfolio of Malvin Muhammad Raqin, a Junior Full Stack Developer. Explore my projects, skills, and experiences in web development and software engineering.",
    creator: "@raqinnnn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  alternates: {
    canonical: "https://malvinraqin.tech",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Malvin Muhammad Raqin",
              "url": "https://malvinraqin.tech",
              "jobTitle": "Full Stack Developer",
              "alumniOf": "University of Indonesia",
              "sameAs": [
                "https://github.com/Malvin0902",
                "https://www.linkedin.com/in/malvinmraqin/",
                "https://www.instagram.com/mlvn.raqin/"
              ],
              "workExample": [
                {
                  "@type": "CreativeWork",
                  "name": "Portfolio Website",
                  "url": "https://malvinraqin.tech"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
