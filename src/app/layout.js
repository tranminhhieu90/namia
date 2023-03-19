import './globals.css'

export const metadata = {
  title: 'Điều hòa thông minh namina',
  description: 'Điều hòa thông minh namia, điều hòa mini namia, điều hòa namia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
