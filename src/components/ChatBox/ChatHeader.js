import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const ChatHeader = ({ roomData }) => {
  return (
    <Card
      sx={{
        bgcolor: "primary.light",
        borderRadius: 0,
        color: "primary.contrastText",
      }}
      elevation={0}
    >
      <CardHeader
        sx={{
          textTransform: "capitalize",
        }}
        avatar={
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <ArrowBackIcon />
            <Avatar
              sx={{
                bgcolor: "primary.contrastText",
                color: "primary.main",
              }}
            >
              {roomData.receiver.name.charAt(0)}
            </Avatar>
          </Box>
        }
        action={
          <>
            <IconButton
              aria-label="video-call"
              sx={{ color: "primary.contrastText" }}
            >
              <VideoCallIcon />
            </IconButton>
            <IconButton
              aria-label="call"
              sx={{ color: "primary.contrastText" }}
            >
              <CallIcon />
            </IconButton>
          </>
        }
        title={roomData.receiver.name}
        subheader={
          <Typography variant="caption" sx={{textTransform:"initial"}}>{roomData.receiver.email}</Typography>
        }
      />
    </Card>
  );
};

export default ChatHeader;
