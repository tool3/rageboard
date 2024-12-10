
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'rageboard-gallery | talhayut',
        template: '%s | talhayut'
    },
    metadataBase: new URL('https://rageboard.vercel.app'),
    description: `rageboard gallery`,
    icons: [
        {
            rel: 'apple-touch-icon',
            url: '/apple-touch-icon.png'
        }
    ],
    manifest: '/manifest.webmanifest',
    twitter: {
        card: 'summary_large_image',
        title: 'RAGEBOARD gallery',
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
