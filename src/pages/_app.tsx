import "@/styles/tailwind.css";
import type { AppProps } from "next/app";

/**
 * Struttura, contesti, proprietà condivise in tutta l'applicazione.
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 *
 * @param { Component, pageProps } compontente e props della pagina da esporre
 * @returns il template della pagina con esposto il contenuto
 */

export default function App({ Component, pageProps }: AppProps) {
  const layout = (
    <>
      <header className="m-0 h-24 w-full bg-blue-500 p-0 text-white">
        <div className="flex items-center justify-center">
          <p>Header</p>
        </div>
      </header>
      <main className="m-0 p-0 text-gray-500">
        <Component {...pageProps} />
      </main>
    </>
  );

  return layout;
}
