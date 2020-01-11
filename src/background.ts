import icon_disabled from './icons/icon_disabled.png';
import { message } from './typings';

chrome.extension.onRequest.addListener(
  (request: message, sender, sendResponse) => {
    if (sender.tab?.id) {
      const tabId: number = sender.tab.id;
      switch (request) {
        case message.showIcon:
          chrome.pageAction.show(tabId);
          break;
        case message.hideIcon:
          chrome.pageAction.setIcon({
            tabId: tabId,
            path: icon_disabled
          });
          chrome.pageAction.hide(tabId);
          break;
      }
    }
    sendResponse({});
  }
);

chrome.pageAction.onClicked.addListener(
  tab => tab?.id && chrome.tabs.sendMessage(tab.id, message.generateRss)
);
