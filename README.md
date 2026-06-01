# Svelte5 router for SPA

`npm i svelte5-router-spa`

Svelte 5 router for Single Page Applications (SPA). It uses `route-recognizer` for flexible path matching and supports asynchronous component loading.

## Usage

### 1. Define your routes

Routes are defined as an object where keys are paths and values are `RoutingFunction`. A `RoutingFunction` can be asynchronous and should return an object with `component` and `props`.

```ts
// routes.ts
import type { Route } from "svelte5-router-spa";
import Home from "./components/Home.svelte";

export const routes: Route = {
    "/": async () => {
        // You can fetch data or dynamic import components here
        return {
            component: Home,
            props: { title: "Welcome Home" }
        };
    },
    "/user/:id": async (params) => {
        const { id } = params;
        const UserProfile = (await import("./components/UserProfile.svelte")).default;
        return {
            component: UserProfile,
            props: { userId: id }
        };
    }
};
```

### 2. Use the Router component

Place the `Router` component in your main application file (e.g., `App.svelte`).

```svelte
<script lang="ts">
    import { Router } from "svelte5-router-spa";
    import { routes } from "./routes";
</script>

<Router route={routes} />
```

### 3. Navigation

You can use the provided navigation utilities to move between pages.

```svelte
<script lang="ts">
    import { navigation } from "svelte5-router-spa";
    const { goto } = navigation;

    function navigate() {
        goto("/home");
    }
</script>

<button onclick={navigate}>Go Home</button>
```

#### Automatic Anchor Handling

To automatically handle standard `<a>` tags for SPA navigation, use `setupLink` in your root layout or entry point.

```svelte
<script lang="ts">
    import { onMount } from "svelte";
    import { navigation } from "svelte5-router-spa";

    onMount(() => {
        navigation.setupLink();
    });
</script>
```

## API

### Router Props

| Prop | Type | Description |
| --- | --- | --- |
| `route` | `Route` | **Required.** The route configuration object. |
| `errorComponent` | `Component` | Optional. Component to show for 404 or 500 errors. |
| `loadingComponent` | `Component` | Optional. Component to show while a route is being resolved. |

### Navigation Utilities (`navigation`)

- `goto(url: string, data?: any)`: Navigate to a new URL.
- `pushState(data: any, url: string)`: Wrapper for `history.pushState`.
- `replaceState(data: any, url: string)`: Wrapper for `history.replaceState`.
- `setupLink()`: Adds a global click listener to handle same-origin `<a>` tags automatically.
- `cleanupLink()`: Removes the global click listener.

### Types

#### `Route`
An object mapping paths to `RoutingFunction`.

#### `RoutingFunction`
`(params?: Params) => MaybePromise<{ component: Component, props: any }>`
A function that receives URL parameters and returns (optionally as a Promise) the component and its props to render.
