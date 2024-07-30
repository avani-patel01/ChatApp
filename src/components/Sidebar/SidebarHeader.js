import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SidebarHeader = ({ user }) => {
  return (
    <Card
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 0,
      }}
    >
      <CardHeader
        sx={{
          textTransform: "capitalize",
        }}
        avatar={
          <Avatar
            aria-label="recipe"
            sx={{
              color: "primary.main",
              background: "#fff",
              textTransform: "capitalize",
            }}
          >
            {user.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="more" sx={{ color: "primary.contrastText" }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={
          <Typography variant="caption">Frontend Developer</Typography>
        }
      />
    </Card>
  );
};

export default SidebarHeader;
