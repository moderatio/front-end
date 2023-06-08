import "@/styles/globals.css";
import type { AppProps } from "next/app";
import WagmiProvider from "../components/WagmiProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-left" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
