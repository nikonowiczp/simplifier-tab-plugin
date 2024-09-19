chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeTitle") {
      document.title = message.newTitle;
    }
  });
  