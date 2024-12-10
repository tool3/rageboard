
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
    title: {
        default: 'rageboard | talhayut',
        template: '%s | talhayut'
    },
    metadataBase: new URL('https://rageboard.vercel.app'),
    description: `rageboard`,
    icons: [
        {
            rel: 'apple-touch-icon',
            url: '/apple-touch-icon.png'
        }
    ],
    openGraph: {
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
    },
    twitter: {
        card: 'summary_large_image',
        title: 'RAGEBOARD',
        creator: 'talhayut',
        siteId: 'talhayut'
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <GoogleAnalytics gaId={'G-50Y8D0TG3M'} />
            <body>{children}</body>
        </html>
    )
}
