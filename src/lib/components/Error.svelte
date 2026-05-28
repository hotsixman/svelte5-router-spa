<script lang="ts">
    import type { ErrorComponent } from "$lib/types.js";
    import type { ComponentProps } from "svelte";

    const {code, message}: ComponentProps<ErrorComponent> = $props();
</script>

<h1>
    {code} Error
</h1>