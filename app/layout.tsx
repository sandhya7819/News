import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomActions from '@/components/layout/BottomActions'
import GDPRNotification from '@/components/modals/GDPRNotification'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TNF - Modern News Website',
  description: 'A modern news and magazine website built with Next.js',
  icons: {
    icon: [
      { url: '/tnf-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/tnf-icon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/tnf-icon.png',
    apple: [
      { url: '/tnf-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#dc2626',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-gray-200 overflow-x-hidden`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <BottomActions />
            <GDPRNotification />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

