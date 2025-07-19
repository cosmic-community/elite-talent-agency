import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elite Talent Agency',
  description: 'Professional modeling agency representing top models, photographers, and designers.',
  keywords: 'modeling agency, models, photographers, designers, fashion, portfolio',
  authors: [{ name: 'Elite Talent Agency' }],
  openGraph: {
    title: 'Elite Talent Agency',
    description: 'Professional modeling agency representing top models, photographers, and designers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Talent Agency',
    description: 'Professional modeling agency representing top models, photographers, and designers.',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}