import { redirect } from "react-router";

export async function clientLoader() {
    localStorage.removeItem("atlasscale_token");
    return redirect("/login");
}

export async function clientAction() {
    localStorage.removeItem("atlasscale_token");
    return redirect("/login");
}

export default function Logout() {
    return (<></>);
}