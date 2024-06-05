'use client'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'

const metadata = { 
  title: "Next App",
  description: "Generated by create next app",
  img:"https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  url: "https://fullstacknextjs-n81myrmpe-brainscollides-projects.vercel.app/",
  type:"Website"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content={metadata.type}/>
        <meta property="og:image" content={metadata.img}/>
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
