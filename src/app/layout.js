'use client'
import { metadata } from './utils/metadata'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content={metadata.type}/>
        <meta property="og:img" content={metadata.img}/>
        <meta property="og:url" content={metadata.url}/>
      </head>
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
