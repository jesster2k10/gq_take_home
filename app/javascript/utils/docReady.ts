export function docReady (fn: () => void): void {
    document.addEventListener('turbolinks:load', fn);
    // // see if DOM is already available
    // if (document.readyState === "complete" || document.readyState === "interactive") {
    //     // call on next available tick
    //     setTimeout(fn, 1);
    // } else {
    //     document.addEventListener("DOMContentLoaded", fn);
    // }
}    