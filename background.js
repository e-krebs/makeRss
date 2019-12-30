chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request === 'showIcon') {
    chrome.pageAction.show(sender.tab.id);
  }
  sendResponse({});
});


chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, 'generateRss');
  console.log('icon clicked');
});
