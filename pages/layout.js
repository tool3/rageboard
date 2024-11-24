import { GoogleTagManager } from '@next/third-parties/google';
import Head from "next/head";


export default function Layout({ children }) {
    <html lang="en">
        <Head>
            <title>Rage Board</title>
            <meta name="description" content="rage keyboard made with threejs and blender" />
            <meta name="author" content="Tal Hayut" />
            <link rel="icon" href="/images/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/images/favicon.ico" sizes="any" />
        </Head>
        <GoogleTagManager gtmId={'G-50Y8D0TG3M'} />
        <body>{children}</body>
    </html>
}