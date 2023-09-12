import { Box } from "@mui/material";
import ChatList from "./ChatList";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatName, setChats, setSelectedChat } from "../store/chat";
import { io } from "socket.io-client";

const Home = () => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const socket = useRef();

  useEffect(() => {
    if (!sessionStorage.getItem("chattyUserId")) {
      navigate("/login");
    } else {
      getChatList();
    }
    socket.current = io("http://localhost:8080");
  }, []);

  useEffect(() => {
    socket.current.on("ping", (chat) => {
      if (chat._id === selectedChat._id) {
        dispatch(setSelectedChat({ selectedChat: chat }));
      }
      refresh();
    });
  }, [selectedChat]);

  const refresh = () => {
    getChatList();
  };

  const sortChats = (chats) => {
    let sortedChats = chats.sort(function (a, b) {
      return (
        new Date(b.latestPing.createdAt) - new Date(a.latestPing.createdAt)
      );
    });
    dispatch(setChats({ chats: sortedChats }));
  };

  const getChatList = () => {
    axios
      .get(
        `http://localhost:8080/find/mychats?userId=${sessionStorage.getItem(
          "chattyUserId"
        )}`
      )
      .then((res) => {
        sortChats(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getActiveChatName = (chat) => {
    return chat.name === ""
      ? chat.participants.filter(
          (part) => part._id !== sessionStorage.getItem("chattyUserId")
        )[0].name
      : chat.name;
  };

  const selectChat = (chat) => {
    dispatch(setSelectedChat({ selectedChat: chat }));
    dispatch(setActiveChatName({ name: getActiveChatName(chat) }));
    axios.post(
      `http://localhost:8080/chat/read?userId=${sessionStorage.getItem(
        "chattyUserId"
      )}&chatroomId=${chat._id}&count=${chat.pings.length}`
    );
  };

  return (
    <Box style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Box style={{ width: "20%" }}>
        <ChatList selectChat={selectChat} refresh={refresh} />
      </Box>
      <Box style={{ width: "80%" }}>
        <Chat />
      </Box>
    </Box>
  );
};

export default Home;
