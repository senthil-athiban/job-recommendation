import PublicRoute from "@/routes/public.route";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicRoute>{children}</PublicRoute>
    </>
  );
}
