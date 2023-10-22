import NavBar from '@/components/Navbar'
import SideBar from '@/components/SideBar'


export default function Layout({children}) {
  return (
    <>
        <div className="flex flex-row min-h-screen">
            <SideBar />
            <main className="flex-grow ml-10">
                <NavBar />
                {children}
            </main>
        </div>
    </>
  )
}
