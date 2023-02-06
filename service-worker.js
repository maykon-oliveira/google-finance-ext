chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

// chrome.action.onClicked.addListener(async (tab) => {
//     if (
//         tab.url.startsWith("https://www.google.com/finance/portfolio/watchlist")
//     ) {
//         // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//         const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//         // Next state will always be the opposite
//         const nextState = prevState === "ON" ? "OFF" : "ON";

//         // Set the action badge to the next state
//         await chrome.action.setBadgeText({
//             tabId: tab.id,
//             text: nextState,
//         });
//     }
// });

const ALARM_NAME = "GF_SCHEDULER_UPDATE";

chrome.alarms.create(ALARM_NAME, {
    periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        console.log(ALARM_NAME);
    }
});

// https://developer.chrome.com/docs/extensions/mv3/user_interface/#notifications
function createNotificationUI(title, message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "images/icon-48.png",
        title,
        message,
        priority: 0,
    });
}
