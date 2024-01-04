import "@/styles/tailwind.css";
import type { AppProps } from "next/app";

/**
 * Template base dell'intera abblicazione.
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
      <main className="m-0 h-full w-full bg-slate-200 p-0 text-gray-500">
        <div className="flex flex-col items-center justify-center">
          <div>Contenuto 1</div>
          <div>
            <Component {...pageProps} />
          </div>
          <div>Contenuto 2</div>
        </div>
      </main>
    </>
  );

  return layout;
}
