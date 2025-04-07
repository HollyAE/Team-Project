import type { AppProps } from "next/app";

import { FirebaseProvider } from "context/firebaseContext";
import { ModalProvider } from "hooks";
import Layout from "layouts/Layout";
import "../styles.globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <FirebaseProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FirebaseProvider>
    </ModalProvider>
  );
}
