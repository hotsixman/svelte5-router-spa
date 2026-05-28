<script lang="ts">
    import Router from "$lib/components/Router.svelte";
    import Home from "$lib/components/test/Home.svelte";
    import Index from "$lib/components/test/Index.svelte";
    import type { Route } from "$lib/types.ts";

    const route: Route = {
        "/": async () => {return {component: Index, props: {}}},
        "/home": async() => ({component: Home, props: {}})
    };
</script>

<Router {route} />
