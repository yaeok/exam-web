import { ChakraProvider } from '@/design'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'exam-web-app',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body>
        <ChakraProvider cssVarsRoot={undefined}>{children}</ChakraProvider>
      </body>
    </html>
  )
}
