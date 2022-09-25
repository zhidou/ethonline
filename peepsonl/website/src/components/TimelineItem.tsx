import {
  ListItem,
  ListItemButton,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import ChatBubbleOutlineTwoToneIcon from "@mui/icons-material/ChatBubbleOutlineTwoTone";
import React from "react";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { ellipsis } from "./Chip";
import WalletContext from "../common/WalletContext";

interface TimelineItemProps {
  data: any;
  createdAt: Date;
  displayName: string | null | undefined;
  address: string;
  avatar: string | null | undefined;
  content: string;
  likeCount: number;
  liked: boolean;
  onLike: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  createdAt,
  content,
  displayName,
  address,
  avatar,
  likeCount,
  liked,
  onLike,
}) => {
  const wallet = React.useContext(WalletContext);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              mt: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Box
                component="img"
                src={avatar || "/images/avatar.png"}
                sx={{ width: 32, height: 32, borderRadius: "50%" }}
              ></Box>
            </Box>
            <Box
              sx={{
                ml: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    {displayName && (
                      <Typography variant="subtitle2" sx={{ mr: 1 }}>
                        {displayName}
                      </Typography>
                    )}
                    <Typography
                      variant="subtitle2"
                      sx={{ opacity: 0.618, fontSize: "0.8em" }}
                    >
                      <i
                        className="cf cf-eth"
                        style={{ fontSize: "0.8em" }}
                      ></i>
                      {ellipsis(address)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(0,0,0,0.3)" }}
                  >
                    {formatDistanceToNow(createdAt, { addSuffix: true })}
                  </Typography>
                </Box>
                <IconButton>
                  <MoreHorizTwoToneIcon />
                </IconButton>
              </Box>
              <Box sx={{ my: 1 }}>{content}</Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  size="small"
                  startIcon={
                    <FavoriteBorderTwoToneIcon
                      color={liked ? "error" : "inherit"}
                    />
                  }
                  onClick={onLike}
                  disabled={!wallet.walletAddress}
                >
                  {likeCount}
                </Button>
                <Button
                  size="small"
                  startIcon={<ChatBubbleOutlineTwoToneIcon />}
                  disabled
                >
                  3
                </Button>
              </Box>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default TimelineItem;
