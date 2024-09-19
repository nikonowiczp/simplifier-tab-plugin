chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        const url = new URL(tab.url);
        const instance = url.hostname.split('.')[0]; // Extract INSTANCE from hostname

        // Check if the URL matches the required structure
        if (url.pathname.includes('/UserInterface/')) {
            if (url.hash.startsWith('#/BusinessObject/client/')) {
                const hashParts = url.hash.split('/');

                const boname = hashParts[4];
                const bofuncname = hashParts[7];


                var newTitle = `CSBO `;
                if (bofuncname) {
                    newTitle += `${bofuncname}`;
                }
                if (boname) {
                    newTitle += `|${boname} `;
                }
                newTitle += `|${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });

            } else if (url.hash.startsWith('#/BusinessObject/')) {
                const hashParts = url.hash.split('/');

                const boname = hashParts[3];
                const bofuncname = hashParts[6];


                var newTitle = `BO `;
                if (bofuncname) {
                    newTitle += `${bofuncname}`;
                }
                if (boname) {
                    newTitle += `|${boname} `;
                }
                newTitle += `|${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }
        }
    }
}
);
