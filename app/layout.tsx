import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za'),
  title: {
    default: 'PawCompare | Compare Pet Insurance in South Africa',
    template: '%s | PawCompare',
  },
  description: 'Compare pet insurance plans from top South African providers. Find the best cover for your dog or cat in 60 seconds. Free, no obligation.',
  keywords: ['pet insurance south africa', 'compare pet insurance sa', 'dog insurance south africa', 'cat insurance south africa'],
  authors: [{ name: 'PawCompare' }],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: 'PawCompare',
    title: 'PawCompare | Compare Pet Insurance in South Africa',
    description: 'Compare pet insurance plans from top SA providers. Find the best cover for your dog or cat.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PawCompare | Compare Pet Insurance in South Africa',
    description: 'Compare pet insurance plans from top SA providers. Find the best cover for your dog or cat.',
  },
  alternates: {
    languages: { 'en-ZA': '/' },
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="en-ZA">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
