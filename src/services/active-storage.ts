const ActiveStorage = {
    set: (value: { [key: string]: any }) => {
        return chrome.storage.local.set(value);
    },
    get: (key: string) => chrome.storage.local.get(key),
    clear: () => chrome.storage.local.clear(),
};

export default ActiveStorage;
