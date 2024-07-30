import {
  Avatar,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ChatArea = ({ allMessages, user, handleDelete, file, setReplyMsg }) => {
  return (
    <Box
      sx={{
        height: file.length ? "calc(100vh - 315px)" : "calc(100vh - 143px)",
        overflowY: "auto",
        bgcolor: "#f9f9f9",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "#f9f9f9",
        }}
      >
        <Chip label="Today" />
      </Stack>
      <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
        {allMessages.map((item, index) => {
          return (
            <Box key={index}>
              {item.sender.id === user.id ? (
                <ListItem
                  sx={{
                    flexDirection: "row-reverse",
                    marginLeft: "auto",
                    mb: 2,
                    maxWidth: "60%",
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: "primary.light",
                      color: "primary.contrastText",
                      borderRadius: "12px 12px 0px 12px",
                      minWidth: "200px",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      {item?.replyMessage?.msg && (
                        <Typography
                          variant="subtitle2"
                          sx={{
                            bgcolor: "primary.main",
                            p: 1,
                            borderRadius: "5px",
                          }}
                        >
                          {item?.replyMessage?.msg}
                        </Typography>
                      )}
                      <Typography variant="subtitle2">{item.msg}</Typography>
                    </div>
                  </Paper>
                  <Box mx={1}>
                    <IconButton size="small" onClick={() => setReplyMsg(item)}>
                      <ReplyIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ) : (
                <ListItem sx={{ mb: 1, maxWidth: "60%" }}>
                  <ListItemAvatar
                    sx={{ textTransform: "capitalize", minWidth: "46px" }}
                  >
                    <Avatar>{item.sender.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: "secondary.light",
                      color: "secondary.contrastText",
                      borderRadius: "12px 12px 12px 0px",
                    }}
                  >
                    {item?.replyMessage?.msg && (
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                          bgcolor: "secondary.main",
                          p: 1,
                          borderRadius: "5px",
                          color: "#fff",
                          minWidth: "200px",
                        }}
                      >
                        {item?.replyMessage?.msg}
                      </Typography>
                    )}
                    <Typography variant="subtitle2">{item.msg}</Typography>
                  </Paper>
                  <Box mx={1}>
                    <IconButton size="small" onClick={() => setReplyMsg(item)}>
                      <ReplyIcon />
                    </IconButton>
                    {/* <IconButton
                      size="small"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton> */}
                  </Box>
                </ListItem>
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default ChatArea;
