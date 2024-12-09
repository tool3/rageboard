import { GoogleAnalytics } from '@next/third-parties/google';
import Head from "next/head";


export default function Layout({ children }) {
    <html lang="en">
        <Head>
            <title>Rage Board</title>
            <meta name="description" content="rage keyboard made with threejs and blender" />
            <meta name="author" content="Tal Hayut" />
            <meta property="og:description" content="RAGEBOARD" />
            <meta property="og:url" content="https://rageboard.vercel.app" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="RAGEBOARD" />
        </Head>
        <GoogleAnalytics gaId={'G-50Y8D0TG3M'} />
        <body>{children}</body>
    </html>
}

export const metadata = {
    title: 'rageboard',
    description: 'RAGEBOARD',
    metadataBase: 'https://rageboard.vercel.app',
  }
   