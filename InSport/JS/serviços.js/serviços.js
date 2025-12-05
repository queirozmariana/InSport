// Suavizar abertura do <details>
document.querySelectorAll("details").forEach(d => {
    d.addEventListener("toggle", () => {
        if (d.open) {
            d.classList.add("open");
        } else {
            d.classList.remove("open");
        }
    });
});
