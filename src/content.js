console.log("CONTENT");

chrome.runtime.onMessage.addListener(function (message, sender, next) {
    if (message.action === "ACTIVES_REQUEST") {
        next(getWatchlist());
    }

    return true;
});

function getWatchlist() {
    const watchList = document.querySelectorAll("div[aria-label] ul a");

    if (!watchList) {
        return [];
    }

    const actives = [];

    watchList.forEach((element) => {
        const activeDiv =
            element.children[0].children[0].children[0].children[0];
        const name = activeDiv.textContent;
        const price =
            element.children[0].children[1].querySelector("span").textContent;

        actives.push({
            name,
            price: parsePriceRaw(price),
            color: activeDiv.style.backgroundColor,
        });
    });

    return actives;
}

function parsePriceRaw(price) {
    return Number(price.replace(/[^\.\d]/g, ""));
}
