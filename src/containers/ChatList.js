import { Avatar, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect } from "react";
import axios from "axios";
import { fonts } from "../common/utils";

const ChatList = () => {
  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = () => {
    axios
      .get("http://localhost:8080/find/chat?userId=64fbfdbea7362fe4d50c954c")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

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
          gap: "0.7vw",
          height: "100%",
          backgroundColor: "#23262fff",
          borderRadius: "0.5vw",
          padding: "1vw",
          boxSizing: "border-box",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              gap: "0.8vw",
              justifyContent: "space-between",
            }}
          >
            <Box style={{ color: "#fff", fontSize: fonts.font_20 }}>Inbox</Box>
            <Box
              style={{
                backgroundColor: "#e31748ff",
                color: "#fff",
                borderRadius: "0.4vw",
                boxSizing: "border-box",
                fontSize: fonts.font_14,
                display: "flex",
                alignItems: "center",
                height: "1.1vw",
                width: "2.6vw",
                justifyContent: "center",
              }}
            >
              2 new
            </Box>
          </Box>
          <Box style={{ color: "#2f80edff", fontSize: fonts.font_20 }}>
            <Search sx={{ width: "1.4vw", height: "1.4vw" }} />
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#282b34ff",
            padding: "0.35vw 0.45vw",
            boxSizing: "border-box",
            borderRadius: "0.4vw",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#3b3e46ff",
              color: "#2f80edff",
              padding: "0.1vw 0.7vw",
              borderRadius: "0.4vw",
              fontSize: fonts.font_16,
            }}
          >
            Primary
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#3b3e46ff",
              color: "#2f80edff",
              padding: "0.1vw 0.7vw",
              borderRadius: "0.4vw",
              fontSize: fonts.font_16,
            }}
          >
            Groups
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#3b3e46ff",
              color: "#2f80edff",
              padding: "0.1vw 0.7vw",
              borderRadius: "0.4vw",
              fontSize: fonts.font_16,
            }}
          >
            Archive
          </Box>
        </Box>
        <Box
          style={{ overflowX: "hidden", overflowY: "scroll", height: "100%" }}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {Array.from({ length: 20 }).map((i) => (
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.7vw",
                backgroundColor: "#3b3e46ff",
                borderRadius: "0.4vw",
              }}
            >
              <Box style={{ alignSelf: "center" }}>
                <Avatar sx={{ width: "2vw", height: "2vw" }}>A</Avatar>
              </Box>
              <Box
                style={{
                  display: "flex",
                  width: "65%",
                  flexDirection: "column",
                }}
              >
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
                    padding: "0.2vw 0 0vw",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  this is a really long msg
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box style={{ color: "#fff", fontSize: fonts.font_12 }}>
                  time
                </Box>
                <Avatar
                  sx={{
                    width: "0.9vw",
                    height: "0.9vw",
                    fontSize: fonts.font_12,
                    bgcolor: "#2f80edff",
                    alignSelf: "flex-end",
                  }}
                >
                  1
                </Avatar>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatList;
