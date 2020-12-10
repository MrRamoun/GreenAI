chrome.tabs.onActivated.addListener((tab) => {
    if(document.readyState === 'ready' || document.readyState === 'complete') {
        chrome.tabs.get(tab.tabId, current_tab_info => {
            if (/^https:\/\/www/.test(current_tab_info.url)) { 
                chrome.tabs.insertCSS(null, {file: 'styles/content.css'});
                chrome.tabs.executeScript(null, {file: 'scripts/import.js'},  () => {console.log('import.js fully loaded.');});
                chrome.tabs.executeScript(null, {file: 'scripts/content.js'}, () => {console.log('content.js fully loaded');});
                chrome.tabs.executeScript(null, {file: 'scripts/foreground.js'}, () => {
                    console.log("injected the foreground.js");
                });
            }
        });
    }
});

var contentTabId;

chrome.runtime.onMessage.addListener(function(msg,sender) {
  if (msg.from == "content") {  //get content scripts tab id
    contentTabId = sender.tab.id;
  }
  if (msg.from == "popup" && contentTabId) {  //got message from popup
    chrome.tabs.sendMessage(contentTabId, {  //send it to content script
      from: "background",
      status: msg.status
    });
  }
});