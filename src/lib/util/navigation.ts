export function pushState(data: any, url: URL | string | null) {
    window.history.pushState(data, "", url);
    window.dispatchEvent(new Event('urlchange'))
}

export function replaceState(data: any, url: URL | string | null) {
    window.history.replaceState(data, "", url);
    window.dispatchEvent(new Event('urlchange'))
}

export function goto(url: URL | string, data?: any) {
    pushState(data, url);
}

export function setupLink() {
    cleanupLink();
    document.addEventListener('click', anchorClickCallback);
}
export function cleanupLink() {
    document.removeEventListener('click', anchorClickCallback);
}
function anchorClickCallback(event: MouseEvent) {
    const target = event.target instanceof Element ? event.target.closest('a') : null;

    if (
        target && 
        target instanceof HTMLAnchorElement && 
        target.origin === location.origin && 
        target.getAttribute('data-disable-spa') === null && 
        (!target.target || target.target === "_self") && 
        !event.ctrlKey && !event.shiftKey
    ) {
        event.preventDefault();
        goto(target.href);
    }
}