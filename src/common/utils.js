import axios from "axios";
import moment from "moment";

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
  return moment.utc(timestamp).local().format("hh:mm A");
  // return moment.utc(timestamp).local().format("HH:mm");
};

export const readChat = (chatId, count) => {
  axios.post(
    `http://localhost:8080/chat/read?userId=${sessionStorage.getItem(
      "chattyUserId"
    )}&chatroomId=${chatId}&count=${count}`
  );
};
