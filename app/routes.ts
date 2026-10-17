import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route("api/chat", "routes/api-chat.ts"),
    layout(
        'layouts/layout.tsx',
        [index("routes/dashboard.tsx"), route("tasks", "routes/tasks.tsx"), route("task/new", "routes/task-new.tsx"), route("task/edit/:id", "routes/task-edit.tsx")]
    )
] satisfies RouteConfig;
