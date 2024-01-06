import { Head, Html, Main, NextScript } from "next/document";

/**
 * Personalizzazione dei tag <html>, <head>, <body>
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-document
 *
 * @returns scheletro header + body HTML
 */

export default function Document() {
  return (
    <Html lang="it-IT">
      <Head />
      <body className="bg-slate-100 font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
