export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full bg-[#0a0e14] text-[#f5f6f8] pt-20 flex flex-col items-center justify-center">
      {children}
    </section>
  );
}
