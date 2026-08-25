export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full bg-[#0a0e14] text-[#f5f6f8] flex items-center justify-center">
      {children}
    </section>
  );
}
