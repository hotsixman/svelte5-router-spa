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
export function cleanupLink(){
    document.removeEventListener('click', anchorClickCallback);
}
function anchorClickCallback(event: MouseEvent) {
    if (event.target && event.target instanceof HTMLAnchorElement && event.target.origin === location.origin && event.target.getAttribute('data-disable-spa') === null && (!event.target.target || event.target.target === "_self")) {
        event.preventDefault();
        goto(event.target.href);
    }
}