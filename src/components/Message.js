import { Box } from "@mui/material";

const fonts = {
  font_12: "0.625vw",
  font_14: "0.729vw",
  font_16: "0.833vw",
  font_18: "0.938vw",
  font_20: "1.042vw",
};

const Message = ({ type }) => {
  return (
    <Box
      style={{
        color: "#fff",
        fontSize: fonts.font_18,
        display: "flex",
        justifyContent: type === "sender" ? "flex-end" : "flex-start",
        marginBottom: "1vw",
        boxSizing: "border-box",
      }}
    >
      <Box
        style={{
          backgroundColor: "#23262fff",
          maxWidth: "50%",
          padding: "0.7vw",
          borderRadius:
            type === "sender" ? "0.9vw 0 0.9vw 0.9vw" : "0 0.9vw 0.9vw 0.9vw",
        }}
      >
        Hi there, this is a test message asdasd asd ad ads asd asdas dasda
        sdasdas dasd asd asdasdasd ada
      </Box>
    </Box>
  );
};

export default Message;
