
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: {
    default: 'RAGEBOARD by Tal Hayut',
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
  twitter: {
    card: 'summary_large_image',
    title: 'RAGEBOARD',
    creator: 'Tal Hayut',
    siteId: 'rageboard'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId={'G-50Y8D0TG3M'} />
    </html>
  )
}
