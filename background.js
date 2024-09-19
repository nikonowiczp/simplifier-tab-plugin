chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        const url = new URL(tab.url);
        const instance = url.hostname.split('.')[0]; // Extract INSTANCE from hostname
        const hashParts = url.hash.split('/');

        // Check if the URL matches the required structure
        if (url.pathname.includes('/UserInterface/')) {
            if (url.hash.startsWith('#/ClientBusinessObject')) {
                const sName = hashParts[2];
                const sFuncName = hashParts[5];


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

            }else if(url.hash.startsWith('#/BusinessObject/client')){
                const sName = hashParts[3];
                const sFuncName = hashParts[6];


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
            }else if (url.hash.startsWith('#/BusinessObject')) {
                var sName = hashParts[2];
                if(sName === "server") sName = hashParts[3];
                const sFuncName = hashParts[5];


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
            }else if (url.hash.startsWith('#/Connector')) {
                var sName = hashParts[3]
                const sFuncName = hashParts[6];


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
            }else if(url.hash.startsWith('#/ApplicationEditor')){
                var sName = hashParts[2]

                var newTitle = `APP `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }else if(url.hash.startsWith('#/Project/ProjectDetails')){
                var sName = hashParts[4]

                var newTitle = `PRO `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }else if(url.hash.startsWith('#/DbDesigner/SchemaDetails')){
                var sName = hashParts[4]

                var newTitle = `DB `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
                // Send a message to content script to change the title
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }else if(url.hash.startsWith('#/Logging/Monitoring')){
                var newTitle = `Monitoring `;
                newTitle += `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }else if(url.hash.startsWith('#/Logging/AuditLog')){
                var newTitle = `Logs `;
                newTitle += `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }else if(url.hash.startsWith('#/Logging/Statistic')){
                var newTitle = `Stats `;
                newTitle += `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }else{
                newTitle = `${instance}`;
                chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
            }
        }
    }
}
);
