export const fonts = {
  font_12: "0.625vw",
  font_14: "0.729vw",
  font_16: "0.833vw",
  font_18: "0.938vw",
  font_20: "1.042vw",
  font_22: "1.146vw",
  font_24: "1.250vw",
  font_26: "1.354vw",
};

export const getTimestamp = (timestamp) => {
  let time = new Date(timestamp).toISOString().split("T")[1].split(".")[0];
  time = time.slice(0, time.lastIndexOf(":"));
  return time;
};
