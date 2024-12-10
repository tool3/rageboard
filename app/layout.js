
import { GoogleAnalytics } from '@next/third-parties/google';

// export const metadata = {
//     title: {
//         default: 'rageboard | talhayut',
//         template: '%s | talhayut'
//     },
//     metadataBase: new URL('https://rageboard.vercel.app'),
//     description: `rageboard`,
//     icons: [
//         {
//             rel: 'apple-touch-icon',
//             url: '/apple-touch-icon.png'
//         }
//     ],
//     openGraph: {
//         url: "https://rageboard.vercel.app",
//         title: metadata.title,
//         description: metadata.description,
//         images: [
//             {
//                 url: "https://rageboard.vercel.app/images/rageboard_min.png",
//                 width: 1920,
//                 height: 1080,
//                 alt: "RAGEBOARD Logo",
//                 type: "image/png"
//             }
//         ],
//         siteName: "rageboard.vercel.app"
//     },
//     twitter: {
//         card: 'summary_large_image',
//         title: 'RAGEBOARD',
//         creator: 'talhayut',
//         siteId: 'talhayut'
//     }
// }

export const metadata = {
    title: "RAGEBOARD",
    description: "rageboard 3d experience",
    url: "https://rageboard.vercel.app"
};

function Head() {
    return (
        <NextSeo
            title={metadata.title}
            description={metadata.description}
            canonical={metadata.url}
            useAppDir={true}
            twitter={{
                site: "rageboard.vercel.app",
                cardType: "summary_large_image"
            }}
            additionalMetaTags={[
                {
                    property: "keywords",
                    content:
                        "threejs, 3D, blender, react-three-fiber, glsl, webgl, nextjs, talhayut"
                },
                // {
                //     name: "google-site-verification",
                //     content: "hbxuij9zFC3nIHTWmjOgCa2e1eLhb90RgzyQ7VsIUNM"
                // },
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
                        url: "https://rageboard.vercel.app/images/rageboard_min.png",
                        width: 1920,
                        height: 1080,
                        alt: "RAGEBOARD Logo",
                        type: "image/png"
                    }
                ],
                siteName: "rageboard.vercel.app"
            }}
        />
    );
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <GoogleAnalytics gaId={'G-50Y8D0TG3M'} />
            <body>{children}</body>
        </html>
    )
}
