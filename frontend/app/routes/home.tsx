import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome";
import {redirectIfAuthenticated} from "../utils/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CIAO React Router App" },
    { name: "description", content: "Welcome, a me, to React Router!" },
  ];
}

export async function clientLoader() {
  await redirectIfAuthenticated();
  return {};
}


export default function Home() {
  return <Welcome />;
}
