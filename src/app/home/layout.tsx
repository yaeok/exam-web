import Header from '@/components/common/header';
import Main from '@/components/common/main';
import { AuthGuard } from '@/providers/auth_guard';

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
