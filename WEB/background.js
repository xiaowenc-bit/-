chrome.runtime.onInstalled.addListener(function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        var tab = tabs[0];
        chrome.pageAction.show(tab.id);
    });
});

chrome.pageAction.onClicked.addListener(function(tabs){
    chrome.tabs.executeScript({ file: "content-script.js" });
});