import { Box } from "@mui/material";
import ChatList from "./ChatList";
import Chat from "./Chat";

const Home = () => {
  return (
    <Box style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Box style={{ width: "20%" }}>
        <ChatList />
      </Box>
      <Box style={{ width: "80%" }}>
        <Chat />
      </Box>
    </Box>
  );
};

export default Home;
