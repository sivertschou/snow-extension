import * as React from "react";
import { MessageTypes } from "../../types";
import "./Button.css";

export const Button = () => {
  const [snowing, setSnowing] = React.useState(true);

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: "REQ_SNOW_STATUS" });

    chrome.runtime.onMessage.addListener((message: MessageTypes) => {
      switch (message.type) {
        case "SNOW_STATUS":
          setSnowing(message.snowing);
          break;
        default:
          break;
      }
    });
  }, []);

  const onClick = () => {
    chrome.runtime.sendMessage({ type: "TOGGLE_SNOW", snowing: !snowing });
  };

  return (
    <div className="buttonContainer">
      <button className="snowButton" onClick={onClick}>
        {snowing ? "Disable the snow 🥶" : "Let it snow! ❄️"}
      </button>
    </div>
  );
};
