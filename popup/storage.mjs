export default {
    set: (value) => {
        return chrome.storage.local.set(value);
    },
    get: (key) => chrome.storage.local.get(key),
    clear: (key) => chrome.storage.local.clear(),
};
