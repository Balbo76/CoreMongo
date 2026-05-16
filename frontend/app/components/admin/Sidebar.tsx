import { NavLink, Form } from "react-router";

export function Sidebar() {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block p-3 rounded-xl transition-all duration-200 ${
            isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 translate-x-1"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
            <div className="p-8 text-xl font-black border-b border-slate-800 flex items-center gap-3 italic">
                <span className="text-3xl not-italic">⛰️</span>
                <span>ATLASSCALE <span className="text-blue-400 font-light text-sm tracking-tighter">OS</span></span>
            </div>

            <nav className="flex-1 p-6 space-y-2">
                <NavLink to="/admin" end className={navLinkClass}>
                    Dashboard
                </NavLink>
                <NavLink to="/admin/profile" className={navLinkClass}>
                    Il mio Profilo
                </NavLink>
                <NavLink to="/admin/components" className={navLinkClass}>
                    Componenti UI
                </NavLink>

                <div className="pt-6 mt-6 border-t border-slate-800">
                    <span className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        Impostazioni
                    </span>
                    <NavLink to="/admin/settings" className="block p-3 mt-2 opacity-30 cursor-not-allowed text-slate-400">
                        Sistema
                    </NavLink>
                </div>
            </nav>

            <div className="p-6 border-t border-slate-800">
                <Form method="post" action="/logout">
                    <button className="w-full text-left p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors flex items-center gap-2 font-bold text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sconnetti
                    </button>
                </Form>
            </div>
        </aside>
    );
}
