import Main from '@/components/main.component'
import { AuthGuard } from '@/providers/auth_guard'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthGuard>
      <Main>{children}</Main>
    </AuthGuard>
  )
}
