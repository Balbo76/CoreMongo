import { TopBar } from './topBar';
export function Welcome() {
  return (<>
    <TopBar />
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <h1 className="text-3xl font-extrabold text-gray-900">Ciao Cazzone!</h1>
      </div>
    </main>
  </>);
}