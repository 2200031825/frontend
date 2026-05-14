"use client";

import SideBar from
"../components/dashboard/SideBar";

export default function MainLayout({
    children,
}) {

    return (

        <div className="
            flex
            min-h-screen
            bg-gray-100
        ">

            <SideBar />

            <main className="
                flex-1
                p-10
                overflow-y-auto
            ">
                {children}
            </main>

        </div>
    );
}