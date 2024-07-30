import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from "axios";

const Sidebar = ({
  user,
  onlineUsers,
  roomData,
  setRoomData,
  setAllMessages,
}) => {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChatRoom = async (user) => {
    setRoomData({ ...roomData, room: "test", receiver: user });
    const allMsg = await axios.get(
      `http://localhost:5000/api/v1/message/${user.id}`
    );
    setAllMessages(await allMsg.data);
  };
  return (
    <>
      <SidebarHeader user={user} />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              variant="fullWidth"
              aria-label="lab API tabs example"
            >
              <Tab
                label="Chat List"
                icon={<ChatBubbleOutlineIcon />}
                iconPosition="start"
                value="0"
              />
              <Tab
                label="User List"
                icon={<PersonOutlineIcon />}
                iconPosition="start"
                value="1"
              />
            </TabList>
          </Box>
          <TabPanel
            value="0"
            sx={{ padding: "0", height: "77vh", overflow: "auto" }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {onlineUsers
                .filter((elem) => elem.id !== user.id)
                .map((item, index) => {
                  return (
                    <Box key={index}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleChatRoom(item)}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ textTransform: "capitalize" }}>
                            {item.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ textTransform: "capitalize" }}
                          primary={item.name}
                          secondary={
                            <Typography variant="caption" sx={{ textTransform: "initial" }}>
                              {item.email}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </Box>
                  );
                })}
            </List>
          </TabPanel>
          <TabPanel value="2">User List</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Sidebar;
