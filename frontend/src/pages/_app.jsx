import { NotificationProvider } from "@/hooks/useNotification";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        <NextNProgress
          options={{ easing: "ease", speed: 500, showSpinner: false }}
        />
        <Component {...pageProps} />
      </NotificationProvider>
    </SessionProvider>
  );
}
