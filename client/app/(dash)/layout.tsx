import ProtectedLayout from "@/routes/protected.route";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedLayout>{children}</ProtectedLayout>
    </>
  );
}
