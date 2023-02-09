import { DOMActive, DOMMessage } from "../chrome-content/types";

async function GetDom(cb: (actives: DOMActive[]) => void) {
    if (!chrome.tabs) {
        return Promise.resolve([]);
    }

    const tabs = await chrome.tabs.query({
        url: "https://www.google.com/finance/portfolio/*",
    });

    if (tabs.length === 0) {
        return [];
    }

    const { id = 0 } = tabs[0];

    chrome.tabs.sendMessage<DOMMessage, DOMActive[]>(
        id,
        { action: "GET_DOM" },
        cb
    );
}

export default GetDom;
