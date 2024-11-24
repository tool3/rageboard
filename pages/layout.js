export default function Layout({ children }) {
    <html lang="en">
        <Head>
            <title>Rage Board</title>
            <meta name="description" content="rage keyboard made with threejs and blender" />
            <meta name="author" content="Tal Hayut" />
            <link rel="icon" href="/images/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/images/favicon.ico" sizes="any" />
        </Head>
        <body>
            {children}
        </body>
        <Script
            async
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=G-50Y8D0TG3M`}
            strategy="lazyOnload"
        />
        <Script async defer id="google-analytics" strategy="lazyOnload">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-50Y8D0TG3M');
        `}
        </Script>
    </html>
}