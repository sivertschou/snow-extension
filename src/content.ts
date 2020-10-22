import "./content.css";
import { MessageTypes } from "./types";

const body = document.getElementsByTagName("body");

const snowflakesContainer = document.createElement("div");
snowflakesContainer.className = "snowflakes";
snowflakesContainer.setAttribute("aria-hidden", "true");

const snowflake = document.createElement("div");
snowflake.className = "snowflake";
snowflake.innerHTML = "❆";

for (let i = 0; i < 12; i++) {
  snowflakesContainer.appendChild(snowflake.cloneNode(true));
}

chrome.runtime.sendMessage({ type: "REQ_SNOW_STATUS" });

let snowing = false;
chrome.runtime.onMessage.addListener((message: MessageTypes) => {
  switch (message.type) {
    case "SNOW_STATUS":
      if (message.snowing) {
        if (!snowing) {
          body[0]?.prepend(snowflakesContainer);
        }
      } else {
        snowflakesContainer.parentNode?.removeChild(snowflakesContainer);
      }
      snowing = message.snowing;
      break;
    default:
      break;
  }
});
