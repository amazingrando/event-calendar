import { Html, Head, Main, NextScript } from 'next/document';
import Footer from '../components/footer';
import Auth from '../lib/context/Auth';

export default function Document() {
  return (
    <Auth>
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/oxi5prc.css" />
        </Head>
        <body className="bg-leafyGreen">
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    </Auth>
  );
}
