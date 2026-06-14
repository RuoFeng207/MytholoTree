console.log("main loaded");

const BASE = window.location.pathname.startsWith("/mytholotree/")
    ? "/mytholotree/"
    : "/";

async function loadComponent(id, file) {
    const el = document.getElementById(id);

    if (!el) {
        console.warn(`Element #${id} not found`);
        return;
    }

    try {
        const url = `${BASE}components/${file}`;

        console.log("Loading:", url);

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed: ${url} (${res.status})`);
        }

        el.innerHTML = await res.text();

    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar", "navbar.html");
    loadComponent("footer", "footer.html");
});