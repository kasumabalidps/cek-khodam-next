import Head from 'next/head'

export default function SEO({ title, description }) {
  return (
    <Head>
      <title>{title || 'Cek Khodam - Terawangan Spiritual'}</title>
      <meta name="description" content={description || 'Aplikasi untuk mengecek khodam dan terawangan spiritual'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
} 