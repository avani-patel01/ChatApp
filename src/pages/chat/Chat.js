import { useEffect, useRef, useState } from "react";
import Profile from "../../components/Profile";
import { Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatBox from "../../components/ChatBox/ChatBox";
import io from "socket.io-client";
import axios from "axios";
const url = "http://localhost:5000/";

const Chat = ({ user }) => {
  const [isconnected, setIsconnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [replyMsg, setReplyMsg] = useState(null);
  const [roomData, setRoomData] = useState({
    room: null,
    receiver: null,
  });
  const [allMessages, setAllMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    const socket = io.connect(url);
    socketRef.current = socket;
    socket.on("connect", () => setIsconnected(true));
    socket.on("disconnect", () => setIsconnected(false));
  }, []);

  useEffect(() => {
    if (isconnected) {
      socketRef.current.emit("ADD_USER", user);
      socketRef.current.on("USER_ADDED", (data) => {
        setOnlineUsers(data);
      });

      socketRef.current.on("RECEIVED_MSG", (data) => {
        setAllMessages((prev) => [...prev, data]);
      });

      socketRef.current.on("DELETED_MSG", (data) => {
        setAllMessages((prev) =>
          prev.filter((item) => item._id !== data.msg._id)
        );
      });
      return () => socketRef.current.disconnect();
    }
  }, [user, isconnected]);

  const handleSendMessage = (msg, file) => {
    if (socketRef.current.connected) {
      let sender = user;
      sender.socketId = socketRef?.current?.id;
      const data = {
        msg,
        receiver: roomData.receiver,
        sender,
      };

      if (replyMsg) {
        data.replyMessage = replyMsg;
      }
      socketRef.current.emit("SEND_MESSAGE", data);
      setReplyMsg(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/message/${id}`
      );
      if (socketRef.current.connected) {
        const data = {
          msg: res.data.data,
          receiver: roomData.receiver,
        };
        socketRef.current.emit("DELETE_MESSAGE", data);
        setAllMessages((prev) =>
          prev.filter((item) => item._id !== res.data.data._id)
        );
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <Sidebar
          user={user}
          onlineUsers={onlineUsers}
          roomData={roomData}
          setRoomData={setRoomData}
          setAllMessages={setAllMessages}
        />
      </Grid>
      <Grid item xs={8}>
        <ChatBox
          roomData={roomData}
          handleSendMessage={handleSendMessage}
          allMessages={allMessages}
          user={user}
          handleDelete={handleDelete}
          replyMsg={replyMsg}
          setReplyMsg={setReplyMsg}
        />
      </Grid>
      <Grid item xs={2}>
        <Profile user={user} />
      </Grid>
    </Grid>
  );
};

export default Chat;
