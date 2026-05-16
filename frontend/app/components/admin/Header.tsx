import { Fragment } from "react";
import { Form, NavLink, useLocation } from "react-router";
import { Menu, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
    user: {
        email: string;
    };
    isLoading: boolean;
}

export function Header({ user, isLoading }: HeaderProps) {
    const location = useLocation();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-10 z-10">
            <div className="flex items-center gap-4">
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="h-2 w-2 bg-blue-500 rounded-full animate-ping"
                        />
                    )}
                </AnimatePresence>
                <h1 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {location.pathname.split('/').pop() || 'Dashboard'}
                </h1>
            </div>

            <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-4 focus:outline-none group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900">{user.email}</p>
                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-tighter">Developer Mode</p>
                    </div>
                    <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-xl group-hover:rotate-3 transition-transform duration-200 border-2 border-slate-100">
                        {user.email[0].toUpperCase()}
                    </div>
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 -translate-y-2"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 -translate-y-2"
                >
                    <Menu.Items className="absolute right-0 mt-4 w-64 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50 p-2">
                        <div className="px-4 py-3">
                            <p className="text-xs font-black text-slate-400 uppercase">Account</p>
                            <p className="text-sm font-bold text-slate-900 truncate mt-1">{user.email}</p>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink to="/admin/profile" className={`${active ? 'bg-slate-50 text-blue-600' : 'text-slate-600'} flex w-full items-center rounded-xl px-4 py-3 text-sm font-bold transition-colors`}>
                                        Il mio Profilo
                                    </NavLink>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Form method="post" action="/logout">
                                        <button type="submit" className={`${active ? 'bg-red-50 text-red-600' : 'text-slate-600'} flex w-full items-center rounded-xl px-4 py-3 text-sm font-bold transition-colors`}>
                                            Esci
                                        </button>
                                    </Form>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </header>
    );
}
