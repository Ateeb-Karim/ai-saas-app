import Navbar from "./_components/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 z-100 w-full">
        <Navbar />
      </header>
      <main className="min-h-screen w-full bg-[#0a0e14] text-[#f5f6f8] pt-20 flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
}
