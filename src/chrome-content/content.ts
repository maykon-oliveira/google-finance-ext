import { DOMMessage, DOMActive } from "./types";

console.log("CONTENT");

const handleGetDOM = (
    message: DOMMessage,
    sender: chrome.runtime.MessageSender,
    next: (response: DOMActive[]) => void
) => {
    const watchList = document.querySelectorAll("div[aria-label] ul a");

    if (!watchList || message.action !== "GET_DOM") {
        return [];
    }

    const actives: DOMActive[] = [];

    watchList.forEach((element: any) => {
        const activeDiv =
            element.children[0].children[0].children[0].children[0];
        const name = activeDiv.textContent!;
        const price =
            element.children[0].children[1].querySelector("span")!.textContent!;

        actives.push({
            name,
            price: parsePriceRaw(price),
            color: activeDiv.style.backgroundColor,
        });
    });

    next(actives);

    return true;
};

function parsePriceRaw(price: string) {
    return Number(price.replace(/[^\.\d]/g, ""));
}

chrome.runtime.onMessage.addListener(handleGetDOM);
