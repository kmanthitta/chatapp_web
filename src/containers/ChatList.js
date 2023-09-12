import { Avatar, Box, IconButton, TextField } from "@mui/material";
import { Add, ArrowBack, Search } from "@mui/icons-material";
import { fonts, getTimestamp } from "../common/utils";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../common/useDebounce";
import axios from "axios";
import SeachResult from "../components/SearchResult";
import { useSelector } from "react-redux";

const ChatList = ({ selectChat, refresh }) => {
  const chats = useSelector((state) => state.chats.chats);
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedValue = useDebounce(searchQuery, 700);

  const search = useCallback(() => {
    if (searchQuery === "") {
      setSearchResults([]);
    } else {
      axios
        .get(
          `http://localhost:8080/find/users?myId=${sessionStorage.getItem(
            "chattyUserId"
          )}&name=${searchQuery}`
        )
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [debouncedValue]);

  const handleStartChat = (id) => {
    axios
      .get(
        `http://localhost:8080/find/chat?userId=${sessionStorage.getItem(
          "chattyUserId"
        )}&withUserId=${id}`
      )
      .then((res) => {
        selectChat(res.data);
        setSearchQuery("");
        setShowSearch(false);
        setSearchResults([]);
      })
      .catch((error) => console.log(error));
  };

  const getUnreadCount = (chat) => {
    let totalCount = chat.pings.length;
    let userReadCount = chat.read.find(
      (user) => user.participantId === sessionStorage.getItem("chattyUserId")
    )?.readNotificationCount;
    if (!userReadCount) {
      return totalCount;
    }
    return totalCount - userReadCount;
  };

  useEffect(() => {
    search();
  }, [debouncedValue, search]);

  return (
    <Box
      style={{
        backgroundColor: "#3b3e46ff",
        height: "100%",
        padding: "1.5vw",
        boxSizing: "border-box",
      }}
    >
      {showSearch ? (
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
          <Box style={{ display: "flex" }}>
            <ArrowBack
              sx={{
                width: "1.6vw",
                height: "1.6vw",
                color: "#fff",
                alignSelf: "center",
                padding: "0.2vw",
                cursor: "pointer",
              }}
              onClick={() => {
                setSearchQuery("");
                setShowSearch(false);
                setSearchResults([]);
              }}
            />
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chat with..."
              inputProps={{
                style: {
                  color: "#fff",
                  fontSize: fonts.font_18,
                  backgroundColor: "#3b3e46ff",
                  padding: "1vw",
                  borderRadius: "0.7vw",
                },
              }}
              InputProps={{ style: { borderRadius: "0.7vw" } }}
            />{" "}
          </Box>
          <Box
            style={{
              overflowX: "hidden",
              overflowY: "scroll",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.4vw",
            }}
            sx={{
              "::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            {searchResults.map((item) => (
              <SeachResult
                name={item.name}
                email={item.email}
                id={item._id}
                onClick={() => handleStartChat(item._id)}
              />
            ))}
          </Box>
        </Box>
      ) : (
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
              <Box style={{ color: "#fff", fontSize: fonts.font_20 }}>
                Inbox
              </Box>
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
            {chats.map(
              (chat) =>
                chat.pings.length > 0 && (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.7vw",
                      backgroundColor:
                        chat._id === selectedChat._id
                          ? "#3b3e46ff"
                          : "#23262fff",
                      borderRadius: "0.4vw",
                      cursor: "pointer",
                    }}
                    onClick={() => selectChat(chat)}
                  >
                    <Box style={{ alignSelf: "center" }}>
                      <Avatar sx={{ width: "2vw", height: "2vw" }}>
                        {chat.name === ""
                          ? chat.participants
                              .filter(
                                (part) =>
                                  part._id !==
                                  sessionStorage.getItem("chattyUserId")
                              )[0]
                              .name.charAt(0)
                              .toUpperCase()
                          : chat.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        width: "60%",
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
                        {chat.name === ""
                          ? chat.participants.filter(
                              (part) =>
                                part._id !==
                                sessionStorage.getItem("chattyUserId")
                            )[0].name
                          : chat.name}
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
                        {chat.pings.length > 0 &&
                          chat.pings[chat.pings.length - 1].message}
                      </Box>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box style={{ color: "#fff", fontSize: fonts.font_14 }}>
                        {chat.pings.length > 0 &&
                          getTimestamp(
                            chat.pings[chat.pings.length - 1].createdAt
                          )}
                      </Box>
                      {getUnreadCount(chat) > 0 && (
                        <Avatar
                          sx={{
                            width: "0.9vw",
                            height: "0.9vw",
                            fontSize: fonts.font_12,
                            bgcolor: "#2f80edff",
                            alignSelf: "flex-end",
                          }}
                        >
                          {getUnreadCount(chat)}
                        </Avatar>
                      )}
                    </Box>
                  </Box>
                )
            )}
            <IconButton
              sx={{
                backgroundColor: "#2f80edff",
                borderRadius: "0.4vw",
                height: "2.5vw",
                width: "3vw",
                ":hover": {
                  bgcolor: "#2f80edff",
                },
                position: "fixed",
                bottom: "2.5vw",
                left: "14.5vw",
                zIndex: 1001,
              }}
              onClick={() => setShowSearch(true)}
            >
              <Add
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
      )}
    </Box>
  );
};

export default ChatList;
