import { Header } from "@/frontend/components/header";
import { LoginPopupFormProvider } from "@/frontend/features/login/context/popup-form";
import { LoginStatusProvider } from "@/frontend/features/login/context/status";
import { apiClient } from "@/frontend/lib/trpc/client";
import "@/styles/tailwind.css";
import type { AppProps, AppType } from "next/app";

/**
 * Struttura, contesti, proprietà condivise in tutta l'applicazione.
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 *
 * @param { Component, pageProps } compontente e props della pagina da esporre
 * @returns il template della pagina con esposto il contenuto
 */

const App: AppType = ({ Component, pageProps }: AppProps) => {
  //
  // template base del corpo della applicazione
  const layout = (
    <>
      <LoginStatusProvider>
        <LoginPopupFormProvider>
          <Header></Header>
          <main className="m-0 p-0 text-gray-500">
            <Component {...pageProps} />
          </main>
        </LoginPopupFormProvider>
      </LoginStatusProvider>
    </>
  );

  return layout;
};

// ------------------------------------------------------------------------------------------------

/**
 * A tutti i componenti presenti nella applicazione viene dato accesso al client
 * tRPC per eseguire le chiamate API.
 */

export default apiClient.withTRPC(App);
