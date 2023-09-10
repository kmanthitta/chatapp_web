import { Box } from "@mui/material";
import ChatList from "./ChatList";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("chattyUserId")) {
      navigate("/login");
    } else {
      getChatList();
    }
  }, []);

  const refresh = () => {
    getChatList();
  };

  const getChatList = () => {
    axios
      .get(
        `http://localhost:8080/find/mychats?userId=${sessionStorage.getItem(
          "chattyUserId"
        )}`
      )
      .then((res) => {
        setChatList(res.data);
        setSelectedChat(res.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <Box style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Box style={{ width: "20%" }}>
        <ChatList
          list={chatList}
          selectChat={selectChat}
          selectedChat={selectedChat}
        />
      </Box>
      <Box style={{ width: "80%" }}>
        <Chat chat={selectedChat} refresh={refresh} />
      </Box>
    </Box>
  );
};

export default Home;
