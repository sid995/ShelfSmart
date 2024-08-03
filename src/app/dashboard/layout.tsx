import { Navbar } from "@/components/blocks/navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-[300px]">
        <Navbar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 w-full">
        {children}
      </div>
    </div>
  )
}