import NavSideBar from "../sidebar/sidebar";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <NavSideBar />
        <main style={{flex: 1}}>
            {children}
        </main>
    </div>
  )
}
