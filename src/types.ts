interface SnowRequest {
  type: "REQ_SNOW_STATUS";
}

interface SnowResponse {
  type: "SNOW_STATUS";
  snowing: boolean;
}

interface SnowToggle {
  type: "TOGGLE_SNOW";
  snowing: boolean;
}

export type MessageTypes = SnowRequest | SnowResponse | SnowToggle;
