import { Navbar } from "@/components/blocks/navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-[300px] fixed top-0 left-0 z-10 bg-muted/40">
        <Navbar />
      </div>
      <div className="relative ml-[300px] flex-grow p-6 md:overflow-y-auto w-full">
        {children}
      </div>
    </div>
  )
}