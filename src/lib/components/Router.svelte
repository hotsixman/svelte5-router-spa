<script lang="ts">
    import { onDestroy, onMount, type Component } from "svelte";
    import type { ErrorComponent, Route, RoutingFunction } from "../types.ts";
    import RouteRecognizer from "route-recognizer";
    import Error from "./Error.svelte";
    import { load } from "$lib/util/navigation.js";

    type Props = {
        route: Route;
        errorComponent?: ErrorComponent;
        loadingComponent?: Component<any>;
    };

    let { route, errorComponent, loadingComponent }: Props = $props();
    let page = $state<{
        component: Component<any>;
        props: Record<string, any>;
    } | null>(null);
    let routeRecognizer = $derived(getRouteRecognizer(route));

    onMount(() => {
        load();
        window.addEventListener('urlchange', onUrlChange);
        window.addEventListener("popstate", onUrlChange);
        onUrlChange();
    });
    onDestroy(() => {
        window.removeEventListener('urlchange', onUrlChange);
        window.removeEventListener("popstate", onUrlChange);
    });

    function getRouteRecognizer(route: Route) {
        const routeRecognizer =
            new (RouteRecognizer as any)() as RouteRecognizer.default;
        for (const [key, value] of Object.entries(route)) {
            routeRecognizer.add([
                {
                    path: key,
                    handler: value,
                },
            ]);
        }
        return routeRecognizer;
    }

    async function onUrlChange() {
        const pathname = location.pathname;
        const result = routeRecognizer.recognize(pathname)?.[0];
        if (!result) {
            page = {
                component: errorComponent ?? Error,
                props: { code: 404 },
            };
            return;
        }

        try {
            const routingFunction = result.handler as RoutingFunction;
            const params = result.params;
            const pagePromise = routingFunction(params);
            if (loadingComponent) {
                page = { component: loadingComponent, props: {} };
            }
            page = await pagePromise;
        } catch (err) {
            page = {
                component: errorComponent ?? Error,
                props: { code: 500, message: `${err}` },
            };
        }
    }
</script>

{#if page}
    {@const Component = page.component}
    <Component {...page.props} />
{/if}
