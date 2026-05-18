import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/auth.login.tsx"),
    route("logout", "routes/auth.logout.tsx"),
    route("register", "routes/auth.register.tsx"),
    route("forgot-password", "routes/auth.forgot-password.tsx"),

    layout("routes/_protected.tsx", [
        route("admin", "routes/_protected._index.tsx"),
        route("admin/components", "routes/_protected.components.tsx"),
        route("admin/profile", "routes/_protected.profile.tsx"),
        route("admin/settings", "routes/_protected.settings.tsx"),
    ])
] satisfies RouteConfig;
