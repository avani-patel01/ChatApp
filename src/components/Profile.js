import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

const Profile = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Avatar
        sx={{ width: "156px", height: "156px" }}
        src="https://mui.com/static/images/avatar/2.jpg"
      />
      <Typography
        variant="h4"
        sx={{ textTransform: "uppercase", color: "primary.main" }}
      >
        {user.name}
      </Typography>
      <Typography variant="subtitle2">UI FroentEnd Developer</Typography>
      <Typography variant="body2" mb={3}>
        {user.email}
      </Typography>
      <Button
        variant="contained"
        href="/"
        onClick={() => localStorage.removeItem("token")}
      >
        LOGOUT
      </Button>
    </Box>
  );
};

export default Profile;
