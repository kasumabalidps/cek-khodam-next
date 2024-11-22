import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './loading'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="id">
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
