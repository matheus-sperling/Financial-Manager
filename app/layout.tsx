import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '💰 Debt Manager',
  description: 'A simple and intuitive web application to manage your personal debts with other people',
  keywords: ['debt', 'finance', 'personal-finance', 'money-management'],
  authors: [{ name: 'Matheus Sperling' }],
  openGraph: {
    title: '💰 Debt Manager',
    description: 'Track your debts with other people - Simple and intuitive debt management',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '💰 Debt Manager',
    description: 'Track your debts with other people',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}