import Head from "next/head";
import Script from 'next/script';


export default function Layout({ children }) {
    <html lang="en">
        <Head>
            <title>Rage Board</title>
            <meta name="description" content="rage keyboard made with threejs and blender" />
            <meta name="author" content="Tal Hayut" />
        </Head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-50Y8D0TG3M" />
        <Script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-50Y8D0TG3M');
        </Script>
        <body>{children}</body>
    </html>
}