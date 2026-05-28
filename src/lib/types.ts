import type { Params } from "route-recognizer";
import type { Component, ComponentProps } from "svelte";

type MaybePromise<T> = T | Promise<T>;

export type Route = Record<string, RoutingFunction>;

export type RoutingFunction<C extends Component<any> = Component<any>> = (params?: Params) => MaybePromise<{
    component: C,
    props: ComponentProps<C>
}>;

export type RouteNode = {
    segment: string;
    type: 'static' | 'dynamic' | 'wild'
    routingFunction: RoutingFunction | null;
    parent: RouteNode | null;
    staticChildren: Map<string, RouteNode>;
    dynamicChildren: Map<string, RouteNode>;
}

//----------------------------------------
export type ErrorComponent = Component<{code: number, message?: string}>