import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import { ToastProvider } from '@/lib/toast-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ToastContainer } from '@/components/toast-container'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PujaSamagri - Complete Puja Kits for Hindu Rituals',
  description: 'Order complete puja samagri kits for all Hindu rituals - Havan, Satyanarayan Katha, Rudra Abhishek, and more. Fast delivery of authentic puja materials.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <ToastContainer />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}
