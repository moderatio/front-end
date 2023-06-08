import "@/styles/globals.css";
import type { AppProps } from "next/app";
import WagmiProvider from "../components/WagmiProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <ToastContainer position="top-left" />
      <Component {...pageProps} />
    </WagmiProvider>
  );
}
