import Header from '@/components/header.component'
import Main from '@/components/main.component'
import { AuthGuard } from '@/providers/auth_guard'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthGuard>
      <Header />
      <Main>{children}</Main>
    </AuthGuard>
  )
}
