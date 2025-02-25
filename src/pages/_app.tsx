import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { wagmi } from "../config";

const client = new QueryClient();
const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={poppins.className}>
      <WagmiProvider config={wagmi}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default MyApp;
