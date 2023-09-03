import { Avatar, Box, Button, IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import Message from "../components/Message";

const fonts = {
  font_12: "0.625vw",
  font_14: "0.729vw",
  font_16: "0.833vw",
  font_18: "0.938vw",
  font_20: "1.042vw",
};

const Chat = () => {
  return (
    <Box
      style={{
        backgroundColor: "#3b3e46ff",
        height: "100%",
        padding: "1.5vw",
        boxSizing: "border-box",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#23262fff",
          borderRadius: "0.5vw",
          padding: "1vw",
          boxSizing: "border-box",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center", height: "5%" }}>
          <Avatar sx={{ width: "2vw", height: "2vw", marginRight: "1vw" }}>
            A
          </Avatar>
          <Box>
            <Box
              style={{
                color: "#fff",
                fontSize: fonts.font_18,
                padding: "0.2vw 0",
              }}
            >
              name
            </Box>
            <Box
              style={{
                color: "#777889ff",
                fontSize: fonts.font_18,
                padding: "0.2vw 0",
              }}
            >
              status
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            backgroundColor: "#3b3e46ff",
            height: "94%",
            padding: "0.6vw",
            boxSizing: "border-box",
            marginTop: "1%",
            borderRadius: "0.4vw",
          }}
        >
          <Box
            style={{ height: "92%", overflowY: "scroll" }}
            sx={{
              "::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            <Message type="sender" />
            <Message type="receiver" />
            <Message type="receiver" />
            <Message type="receiver" />
            <Message type="sender" />
            <Message type="receiver" />
            <Message type="receiver" />
            <Message type="sender" />
            <Message type="receiver" />
          </Box>
          <Box
            style={{
              height: "8%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Message"
              fullWidth
              size="small"
              InputProps={{ disableUnderline: true }}
              inputProps={{
                style: {
                  fontSize: fonts.font_18,
                  color: "#fff",
                  backgroundColor: "#23262fff",
                  borderRadius: "0.4vw",
                  padding: "0.4vw 0 0.4vw 1vw",
                  marginRight: "0.7vw",
                },
              }}
            />
            <IconButton
              sx={{
                backgroundColor: "#2f80edff",
                borderRadius: "0.4vw",
                height: "2vw",
                width: "3vw",
                ":hover": {
                  bgcolor: "#2f80edff",
                },
              }}
              on
            >
              <Send
                sx={{
                  width: "1.6vw",
                  height: "1.6vw",
                  color: "#fff",
                  alignSelf: "center",
                  padding: "0.2vw",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
