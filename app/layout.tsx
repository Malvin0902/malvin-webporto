import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Malvin Muhammad Raqin - Designer & Developer Portfolio",
  description: "Portfolio website of Malvin Muhammad Raqin (Malvin Raqin), a designer and developer specializing in creating minimal, text-based digital experiences. Explore my work in design and web development.",
  keywords: "Malvin Muhammad Raqin, Malvin Raqin, designer, developer, portfolio, web development, UI/UX design, minimalist design",
  authors: [{ name: "Malvin Muhammad Raqin" }],
  creator: "Malvin Muhammad Raqin",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Malvin Muhammad Raqin - Designer & Developer Portfolio",
    description: "Portfolio website of Malvin Muhammad Raqin (Malvin Raqin), a designer and developer specializing in creating minimal, text-based digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malvin Muhammad Raqin - Designer & Developer Portfolio",
    description: "Portfolio website of Malvin Muhammad Raqin (Malvin Raqin), a designer and developer specializing in creating minimal, text-based digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'Next.js'
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
      </body>
    </html>
  )
}
