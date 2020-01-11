import { RssItem, message } from './typings';
import { copyItemAsXml } from './utils';
import { getGamekultItem } from './utils/extractors';

const setup = (item?: RssItem): void => {
  if (!item) return;

  // show icon
  chrome.extension.sendRequest(message.showIcon);

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === message.generateRss) copyItemAsXml(item);
  });
}

// hide icon by default
chrome.extension.sendRequest(message.hideIcon);

switch (window.location.host) {
  case 'www.gamekult.com':
    getGamekultItem(document, window, setup);
    break;
}
