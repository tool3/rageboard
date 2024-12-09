import { GoogleAnalytics } from '@next/third-parties/google';
import Head from "next/head";


export default function Layout({ children }) {
    <html lang="en">
        <Head>
            <title>Rage Board</title>
            <meta name="description" content="rage keyboard made with threejs and blender" />
            <meta name="author" content="Tal Hayut" />
            <meta property="og:image" content="https://rageboard.vercel.app/images/rageboard.png" />
            <meta property="og:image:width" content="1920" />
            <meta property="og:image:height" content="1080" />
        </Head>
        <GoogleAnalytics gaId={'G-50Y8D0TG3M'} />
        <body>{children}</body>
    </html>
}