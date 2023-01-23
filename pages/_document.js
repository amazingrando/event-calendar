import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/oxi5prc.css" />
        <link
          href="https://fonts.cdnfonts.com/css/pp-fragment"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-leafyGreen">
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
