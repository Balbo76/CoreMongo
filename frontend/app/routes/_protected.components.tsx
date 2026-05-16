import { useState } from 'react'
import { Tab, Switch, Disclosure, Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Card } from '../components/ui/Card'

export default function HeadlessDemo() {
    const [enabled, setEnabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <header>
                <h2 className="text-3xl font-bold text-gray-900">Headless UI Playground</h2>
                <p className="text-gray-500 mt-2">Test dei componenti interattivi accessibili.</p>
            </header>

            {/* 1. TABS */}
            <Card title="01. Tabs">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/10 p-1">
                        {['Dati', 'Sicurezza', 'Log'].map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${selected ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-800'}`
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-4">
                        <Tab.Panel className="p-3 text-sm text-gray-500 italic">Contenuto tab Dati...</Tab.Panel>
                        <Tab.Panel className="p-3 text-sm text-gray-500 italic">Parametri di Sicurezza...</Tab.Panel>
                        <Tab.Panel className="p-3 text-sm text-gray-500 italic">Cronologia Log sistema...</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </Card>

            {/* 2. SWITCH (TOGGLE) */}
            <Card title="02. Switch" description="Attiva notifiche push" className="flex items-center justify-between">
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
          <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
                </Switch>
            </Card>

            {/* 3. DISCLOSURE (ACCORDION) */}
            <Card title="03. Disclosure">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                                <span>Cos'è AtlasScale OS?</span>                                <span className={`${open ? 'rotate-180 transform' : ''} transition-transform`}>▼</span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                È un'architettura full-stack costruita con React Router 7, Node.js e MongoDB.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </Card>

            {/* 4. DIALOG (MODAL) */}
            <Card title="04. Dialog">
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-black/30 transition"
                >
                    Apri Modale di Test
                </button>

                <Transition show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Conferma Azione
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Questa è una finestra modale gestita da Headless UI. È completamente accessibile.
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Capito, grazie!
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Card>
        </div>
    )
}