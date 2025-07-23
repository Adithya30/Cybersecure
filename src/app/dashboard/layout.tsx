import HomeTopbar from "./_components/HomeTapbar"
import SideBarHome from "./_components/SideBarHome"
import FuturisticCybersecurityLanding from ".././dashboard/page"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      <HomeTopbar />
      
      <SideBarHome>
        <FuturisticCybersecurityLanding />
          <main className="w-full h-screen p-4">
              <h1>{children}</h1>
          </main>
      </SideBarHome>
    </div>
  )
}