import localFont from 'next/font/local'
import "./globals.css";
 

const myFont = localFont({ src: '../fonts/FuturaHandwritten.ttf', variable: "--font-futurahand" })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased overflow-y-hidden overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
