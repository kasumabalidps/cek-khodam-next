import { Suspense } from 'react'
import { Inter } from "next/font/google"
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './loading'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-gray-800`}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
