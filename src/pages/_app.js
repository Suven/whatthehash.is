import "@/styles/globals.css";
import { Fira_Mono } from "@next/font/google";

const firaMono = Fira_Mono({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          --font-accent: ${firaMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
