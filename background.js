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
            } else if (url.hash.startsWith('#/ApplicationEditor')) {
                sName = hashParts[2]

                if (!hideObjectType) newTitle += `APP `;
                if (sName) {
                    newTitle += `${sName} `;
                }
            } else if (url.hash.startsWith('#/Project/ProjectDetails')) {
                sName = hashParts[4]

                if (!hideObjectType) newTitle += `PRO `;
                if (sName) {
                    newTitle += `${sName} `;
                }
            } else if (url.hash.startsWith('#/DbDesigner/SchemaDetails')) {
                sName = hashParts[4]

                if (!hideObjectType) newTitle += `DB `;
                if (sName) {
                    newTitle += `${sName} `;
                }
            }else if(url.hash.startsWith('#/DbDesigner/DataEditor')){
                sName = hashParts[3]
                if (!hideObjectType) newTitle += `DB-EDIT `;
                if (sName) {
                    newTitle += `${sName} `;
                }
            } else if (url.hash.startsWith('#/DataType/domain')) {
                if (!hideObjectType) newTitle += `Domain Data Types `;
            } else if (url.hash.startsWith('#/DomainType')) {
                sName = hashParts[3];
                if (!hideObjectType) newTitle += `DMT `;
                if(sName) newTitle += `${sName} `;
            } else if (url.hash.startsWith('#/DataType/struct')) {
                if (!hideObjectType) newTitle += `Struct Data Types `;
            } else if (url.hash.startsWith('#/Struct/')) {
                sName = hashParts[3];
                if (!hideObjectType) newTitle += `STR `;
                if(sName) newTitle += `${sName} `;
            } else if (url.hash.startsWith('#/DataType/collection')) {
                if (!hideObjectType) newTitle += `Collection Data Types `;
            } else if (url.hash.startsWith('#/Collection/')) {
                sName = hashParts[3];
                if (!hideObjectType) newTitle += `COL `;
                if(sName) newTitle += `${sName} `;
            } else if (url.hash.startsWith('#/Template')) {
                if (!hideObjectType) newTitle += `Templates `;
            } else if (url.hash.startsWith('#/TemplateDetails')) {
                sName = hashParts[3];
                sFuncName = hashParts[4];
                if (!hideObjectType) newTitle += `TMP `;
                if(sFuncName) newTitle += `${sFuncName} `;
                if(sName) newTitle += `${sName} `;
            } else if (url.hash.startsWith('#/DbDesigner/DeployLog')) {
                if (!hideObjectType) newTitle += `Deploy Log `;
            } else if (url.hash.startsWith('#/Logging/Monitoring')) {
                if (!hideObjectType) newTitle += `Monitoring `;
            } else if (url.hash.startsWith('#/Logging/AuditLog')) {
                if (!hideObjectType) newTitle += `Logs `;
            } else if (url.hash.startsWith('#/Logging/Statistic')) {
                if (!hideObjectType) newTitle = `Stats `;
            } else if (url.hash.startsWith('#/Transport/Collection')) {
                sName = hashParts[4];
                if (!hideObjectType) newTitle = `PKG `;
                if(sName) newTitle += `${sName} `;
            } else if (url.hash.startsWith('#/Transport/Request')) {
                sName = hashParts[4];
                if (!hideObjectType) newTitle = `TP `;
                if(sName) newTitle += `${sName} `;
            } else if (url.hash.startsWith('#/Transport/Import')) {
                if (!hideObjectType) newTitle = `Import `;
            } 
            newTitle += `${instance}`;

            chrome.tabs.sendMessage(tabId, { action: "changeTitle", newTitle: newTitle });
        }
    }
}
);
