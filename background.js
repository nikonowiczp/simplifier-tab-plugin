chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) =>  {
    if (changeInfo.status === 'complete') {
        const url = new URL(tab.url);

        // Check if the URL matches the required structure
        if (url.pathname.includes('/UserInterface/')) {
            var instance = url.hostname.split('.')[0]; // Extract INSTANCE from hostname

            let data = await chrome.storage.sync.get(['rules']);
            if(data.rules) {
                let rule = data.rules.find(rule => rule.hostname === url.hostname)
                if(rule) {
                    instance = rule.instanceName;
                }
            }
            let sName = "";
            let sFuncName = "";

            const hashParts = url.hash.split('/');


            if (instance === "aws") {
                instance = url.hostname.split('.')[1]; // Special case for Siemens
            }
            if (url.hash.startsWith('#/ClientBusinessObject')) {
                sName = hashParts[2];
                sFuncName = hashParts[5];


                var newTitle = `CSBO `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });

            } else if (url.hash.startsWith('#/BusinessObject/client')) {
                sName = hashParts[3];
                sFuncName = hashParts[6];


                var newTitle = `CSBO `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/BusinessObject')) {
                sName = hashParts[2];
                if (sName === "server") sName = hashParts[3];
                sFuncName = hashParts[5];


                var newTitle = `BO `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/Connector')) {
                sName = hashParts[3]
                sFuncName = hashParts[6];


                var newTitle = `CON `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/ApplicationEditor')) {
                sName = hashParts[2]

                var newTitle = `APP `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/Project/ProjectDetails')) {
                sName = hashParts[4]

                var newTitle = `PRO `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/DbDesigner/SchemaDetails')) {
                sName = hashParts[4]

                var newTitle = `DB `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/Logging/Monitoring')) {
                var newTitle = `Monitoring `;
                newTitle += `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/Logging/AuditLog')) {
                var newTitle = `Logs `;
                newTitle += `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else if (url.hash.startsWith('#/Logging/Statistic')) {
                var newTitle = `Stats `;
                newTitle += `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            } else {
                newTitle = `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }
        }
    }
}
);
