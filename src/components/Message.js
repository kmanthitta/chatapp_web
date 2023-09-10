import { Box } from "@mui/material";
import { fonts } from "../common/utils";

const Message = ({ content, type, timestamp }) => {
  let time = new Date(timestamp).toISOString().split("T")[1].split(".")[0];
  time = time.slice(0, time.lastIndexOf(":"));

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: type === "sender" ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      <Box
        style={{
          color: "#fff",
          fontSize: fonts.font_18,
          maxWidth: "55%",
          display: "flex",
          flexDirection: "column",
          alignItems: type === "sender" ? "flex-end" : "flex-start",
          marginBottom: "1vw",
          boxSizing: "border-box",
        }}
      >
        <Box
          style={{
            backgroundColor: "#23262fff",
            padding: "0.7vw",
            borderRadius:
              type === "sender" ? "0.9vw 0 0.9vw 0.9vw" : "0 0.9vw 0.9vw 0.9vw",
          }}
        >
          {content}
        </Box>
        <Box
          style={{
            fontSize: fonts.font_14,
            alignSelf: "end",
            padding: "0.3vw 0.4vw 0 0",
          }}
        >
          {time}
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
