chrome.extension.onRequest.addListener(
  (request, sender, sendResponse) => {
    switch (request) {
      case 'showIcon':
        chrome.pageAction.show(sender.tab.id);
        break;
      case 'hideIcon':
        chrome.pageAction.setIcon({
          tabId: sender.tab.id,
          path: '/icons/icon_disabled.png'
        });
        chrome.pageAction.hide(sender.tab.id);
        break;
    }
    sendResponse({});
  }
);

chrome.pageAction.onClicked.addListener(
  tab => chrome.tabs.sendMessage(tab.id, 'generateRss')
);
