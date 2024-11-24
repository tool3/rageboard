import { GoogleAnalytics } from '@next/third-parties/google';
import Head from "next/head";


export default function Layout({ children }) {
    <html lang="en">
        <Head>
            <title>Rage Board</title>
            <meta name="description" content="rage keyboard made with threejs and blender" />
            <meta name="author" content="Tal Hayut" />
        </Head>
        <GoogleAnalytics gaId={'G-50Y8D0TG3M'} />
        <body>{children}</body>
    </html>
}