import { useState } from "react";
import { Badge, Box, IconButton, TextField, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import EmojiPicker from "emoji-picker-react";

const ChatFooter = ({ handleSendMessage, file, setFile, replyMsg }) => {
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleEmojiClick = (e) => {
    setMessage((prevMessage) => prevMessage + e.emoji);
    setEmojiPickerOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message || file.length) {
      handleSendMessage(message, file);
      setMessage("");
      setFile([]);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      {replyMsg && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "60px",
            background: "#ddd",
            borderLeft: "4px solid",
            borderColor: "primary.light",
          }}
          p={1}
        >
          <Typography>{replyMsg.sender.name}</Typography>
          <Typography variant="caption">{replyMsg.msg}</Typography>
        </Box>
      )}
      <Box
        sx={{
          overflowX: "scroll",
          background: "#f9f9f9",
          display: "flex",
          width: "100%",
          height: "fit-content",
          padding: file.length ? 2 : 0,
        }}
      >
        {file &&
          Object.entries(file)?.map((item, index) => {
            return (
              <Badge
                badgeContent={
                  <CloseIcon
                    sx={{ width: "16px", height: "16px", color: "#fff" }}
                  />
                }
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    padding: "2px",
                    height: "auto",
                    borderRadius: "50%",
                    right: "10px",
                  },
                }}
                key={index}
              >
                <Box
                  p={1}
                  mx={1}
                  sx={{
                    border: "1px dashed #0000008a",
                    width: "120px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <IconButton disabled>
                    <DescriptionOutlinedIcon
                      sx={{ width: "60px", height: "60px" }}
                    />
                  </IconButton>
                  <Typography
                    variant="caption"
                    component="p"
                    title={item[1].name}
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item[1].name}
                  </Typography>
                </Box>
              </Badge>
            );
          })}
      </Box>
      <Box sx={{ display: "flex" }} py={1}>
        <Box>
          <input
            accept="*"
            style={{ display: "none" }}
            id="file-input"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          {/* <label htmlFor="file-input">
            <IconButton aria-label="attach" size="medium" component="span">
              <AttachFileIcon />
            </IconButton>
          </label> */}
          <div style={{ position: "absolute", bottom: "0" }}>
            <EmojiPicker
              height={400}
              width={300}
              open={emojiPickerOpen}
              skinTonesDisabled={true}
              searchDisabled
              onEmojiClick={handleEmojiClick}
              style={{
                position: "absolute",
                top: "-460px",
                left: "0",
                zIndex: "9999",
              }}
            />
          </div>
          <IconButton
            aria-label="emoji"
            size="medium"
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <SentimentSatisfiedOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ display: "flex", flex: 1, alignItems: "center" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-basic"
            variant="standard"
            fullWidth
            size="small"
            placeholder="Type something to send..."
            onChange={handleChange}
            value={message}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="send">
            <SendOutlinedIcon sx={{ transform: "rotate(-45deg)" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatFooter;
