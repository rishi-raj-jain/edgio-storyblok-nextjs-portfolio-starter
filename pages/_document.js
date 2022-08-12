import { structuredData } from '@/lib/data'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="twitter:card" content="summary_large_image" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <link rel="stylesheet" type="font/woff2" crossOrigin="anonymous" href="/fonts/inter-var.woff2" />
        </body>
      </Html>
    )
  }
}
