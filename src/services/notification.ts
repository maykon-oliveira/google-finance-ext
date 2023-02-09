const notification = {
    create: function create(title: string, message: string) {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon-48.png",
            title,
            message,
            priority: 0,
        });
    },
};

export default notification;
