import { Head, Html, Main, NextScript } from "next/document";

/**
 * Proprietà HTML base dell'intera applicazione
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
