import { I18NProvider } from "@/context/i18n";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <I18NProvider>
      <Component {...pageProps} />
    </I18NProvider>
  );
}
