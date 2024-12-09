import './index.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

export const metadata = {
  title: 'rageboard',
  description: 'RAGEBOARD',
  metadataBase: new URL('https://rageboard.vercel.app'),
}
