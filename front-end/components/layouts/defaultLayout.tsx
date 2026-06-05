import NavSideBar from "../sidebar/sidebar";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{flex: 1, display: "flex", alignItems: "flex-start", gap: "1.5rem"}}>
        <NavSideBar />
        <main style={{flex: 1}}>
            {children}
        </main>
    </div>
  )
}
