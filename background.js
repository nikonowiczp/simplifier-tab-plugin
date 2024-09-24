chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' || changeInfo.title === 'Simplifier') {
        const url = new URL(tab.url);
        if (url?.pathname.startsWith('/UserInterface/')) {
            var instance = url.hostname.split('.')[0];

            let data = await chrome.storage.sync.get(['rules','onlyUseWithRules','hideObjectType']);
            const onlyUseWithRules = data?.onlyUseWithRules ?? false;
            const hideObjectType = data?.hideObjectType ?? false;
            if (data?.rules) {
                let rule = data.rules.find(rule => rule.hostname === url.hostname)
                if (rule) {
                    instance = rule.instanceName;
                } else if (onlyUseWithRules) {
                    return;
                }
            }
            let newTitle = "";
            let sName = "";
            let sFuncName = "";

            const hashParts = url.hash.split('/');

            if (instance === "aws") {
                instance = url.hostname.split('.')[1];
            }
            if (url.hash.startsWith('#/ClientBusinessObject')) {
                sName = hashParts[2];
                sFuncName = hashParts[5];
                if (!hideObjectType) newTitle += `CSBO `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/BusinessObject/client')) {
                sName = hashParts[3];
                sFuncName = hashParts[6];


                if (!hideObjectType) newTitle += `CSBO `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/BusinessObject')) {
                sName = hashParts[2];
                if (sName === "server") sName = hashParts[3];
                sFuncName = hashParts[5];


                if (!hideObjectType) newTitle += `BO `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/Connector')) {
                sName = hashParts[3]
                sFuncName = hashParts[6];


                if (!hideObjectType) newTitle += `CON `;
                if (sFuncName) {
                    newTitle += `${sFuncName} `;
                }
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/ApplicationEditor')) {
                sName = hashParts[2]

                if (!hideObjectType) newTitle += `APP `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/Project/ProjectDetails')) {
                sName = hashParts[4]

                if (!hideObjectType) newTitle += `PRO `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/DbDesigner/SchemaDetails')) {
                sName = hashParts[4]

                if (!hideObjectType) newTitle += `DB `;
                if (sName) {
                    newTitle += `${sName} `;
                }
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/Logging/Monitoring')) {
                if (!hideObjectType) newTitle += `Monitoring `;
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/Logging/AuditLog')) {
                if (!hideObjectType) newTitle += `Logs `;
                newTitle += `${instance}`;
            } else if (url.hash.startsWith('#/Logging/Statistic')) {
                if (!hideObjectType) newTitle = `Stats `;
                newTitle += `${instance}`;
            } else {
                newTitle += `${instance}`;
            }
            chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
        }
    }
}
);
