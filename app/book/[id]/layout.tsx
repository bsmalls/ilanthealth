import Header from "@/app/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="px-10 py-4">
        <div className="w-full max-w-screen-xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
