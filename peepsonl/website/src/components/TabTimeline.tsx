import { Box, Button, List, TextField } from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import React from "react";
import TimelineItem from "./TimelineItem";
import ProfileContext from "../common/ProfileContext";
import UserContext from "../common/UserContext";
import TimelineItemSkeleton from "./TimelineItemSkeleton";
import { usePosts } from "../common/web3storage";
import WalletContext from "../common/WalletContext";

const TabTimeline: React.FC = () => {
  const user = React.useContext(UserContext);
  const profile = React.useContext(ProfileContext);
  const wallet = React.useContext(WalletContext);
  const { posts, refetch, like, send } = usePosts(user.address);
  const [newPost, setNewPost] = React.useState<string>("");
  const handleLike = React.useCallback(
    (idx: number) => {
      if (!wallet.walletAddress) return;
      like(idx, wallet.walletAddress)?.then(() => {
        refetch();
      });
    },
    [like, refetch, wallet.walletAddress]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 2,
        pt: 1,
        backgroundColor: "white",
      }}
    >
      {wallet.walletAddress && wallet.walletAddress === user.address && (
        <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
          <TextField
            variant="outlined"
            sx={{ flex: 1, marginRight: 1 }}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Wasup!"
          />
          <Button
            onClick={() => {
              send(newPost)?.then(() => {
                setNewPost("");
                refetch();
              });
            }}
          >
            <SendTwoToneIcon />
          </Button>
        </Box>
      )}
      <List>
        {user.address === null ? (
          <TimelineItemSkeleton />
        ) : (
          posts?.map((post, idx) => {
            return (
              <TimelineItem
                key={idx + post.content}
                data={post}
                createdAt={post.createdAt}
                content={post.content}
                displayName={user.uid || user.ens}
                address={user.address || ""}
                avatar={profile.textRecords.avatar}
                likeCount={Object.keys(post.like).length || 0}
                onLike={() => handleLike(idx)}
                liked={!!post.like[wallet.walletAddress || -1]}
              />
            );
          })
        )}
      </List>
    </Box>
  );
};

export default TabTimeline;
