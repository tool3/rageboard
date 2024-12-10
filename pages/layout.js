import { GoogleAnalytics } from '@next/third-parties/google';
import { NextSeo } from 'next-seo';

const metadata = {
    title: "RAGEBOARD",
    description: "RAGEBOARD",
    url: "https://rageboard.vercel.app",
};


const Header = () => {
    return (
        <NextSeo
            title={metadata.title}
            description={metadata.description}
            canonical="https://rageboard.vercel.app"
            useAppDir={true}
            twitter={{
                site: "rageboard.vercel.app",
                cardType: "summary_large_image"
            }}
            additionalMetaTags={[
                {
                    property: "keywords",
                    content:
                        "threejs, blender, 3d, glsl, react-three-fiber"
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, maximum-scale=5"
                },
                {
                    name: "apple-mobile-web-app-capable",
                    content: "yes"
                },
                {
                    name: "og:image:width",
                    content: "1920"
                },
                {
                    name: "og:image:height",
                    content: "1080"
                },
                {
                    name: "theme-color",
                    content: "#FF6422"
                }
            ]}
            openGraph={{
                url: "https://rageboard.vercel.app",
                title: metadata.title,
                description: metadata.description,
                images: [
                    {
                        url: "https://rageboard.vercel.app/images/opengraph-image.png",
                        width: 1920,
                        height: 1080,
                        alt: "RAGEBOARD Logo",
                        type: "image/png"
                    }
                ],
                siteName: "ybh-law"
            }}
        />
    )
}

export default function Layout({ children }) {
    return (
        <html lang="en">
            <Header />
            <GoogleAnalytics gaId={'G-50Y8D0TG3M'} />

            <body>{children}</body>
        </html>
    )
}
