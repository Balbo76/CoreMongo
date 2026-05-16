import { useNavigation, Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { PageTransition } from "../PageTransition";
import type { User } from "@atlasscale/shared";

interface DashboardLayoutProps {
    user: User;
}

export function DashboardLayout({ user }: DashboardLayoutProps) {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-inter">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 relative">
                <Header user={user} isLoading={isLoading} />
                <main className="flex-1 overflow-y-auto bg-gray-50/50">
                    <PageTransition isLoading={isLoading}>
                        <Outlet context={{ user }} />
                    </PageTransition>
                </main>
            </div>
        </div>
    );
}
