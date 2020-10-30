import { MessageTypes } from "./types";

const sendSnowStatus = (snowing: boolean) => {
  const message = { type: "SNOW_STATUS", snowing };

  // send message to popup
  chrome.runtime.sendMessage(message);

  // send message to every active tab
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};

let snowing = false;

// Get locally stored value
chrome.storage.local.get("snowing", (res) => {
  if (res["snowing"]) {
    snowing = true;
  } else {
    snowing = false;
  }
});

chrome.runtime.onMessage.addListener((message: MessageTypes) => {
  switch (message.type) {
    case "REQ_SNOW_STATUS":
      sendSnowStatus(snowing);
      break;
    case "TOGGLE_SNOW":
      snowing = message.snowing;
      chrome.storage.local.set({ snowing: snowing });
      sendSnowStatus(snowing);
      break;
    default:
      break;
  }
});
