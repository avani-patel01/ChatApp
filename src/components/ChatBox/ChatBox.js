import React, { useState } from "react";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { Box } from "@mui/material";

const ChatBox = ({
  roomData,
  handleSendMessage,
  allMessages,
  user,
  handleDelete,
  setReplyMsg,
  replyMsg,
}) => {
  const [file, setFile] = useState({});

  return (
    <Box sx={{ height: "100%" }}>
      {roomData.room ? (
        <>
          <ChatHeader roomData={roomData} />
          <ChatArea
            allMessages={allMessages}
            user={user}
            handleDelete={handleDelete}
            file={file}
            setReplyMsg={setReplyMsg}
          />
          <ChatFooter
            handleSendMessage={handleSendMessage}
            file={file}
            setFile={setFile}
            replyMsg={replyMsg}
          />
        </>
      ) : (
        <>Please select a user to Chat</>
      )}
    </Box>
  );
};

export default ChatBox;
