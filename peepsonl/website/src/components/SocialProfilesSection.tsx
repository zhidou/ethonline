import { Box } from "@mui/material";
import React from "react";
import ProfileContext from "../common/ProfileContext";
import Chip from "./Chip";
import SectionTitle from "./SectionTitle";

function removeAtSign(s: string) {
  if (s.length === 0) return s;
  return s[0] === "@" ? s.substring(1) : s;
}

const SocialProfilesSection: React.FC = () => {
  const profile = React.useContext(ProfileContext);

  return (
    <Box sx={{ px: 3, my: 4 }}>
      <SectionTitle icon="🤳🏻" title="Social profiles" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip
          src="/images/icon/link.png"
          content={profile.textRecords.url}
          contentLink={profile.textRecords.url ?? undefined}
        />
        <Chip
          src="/images/icon/twitter.png"
          content={profile.textRecords["com.twitter"]}
          contentLink={
            profile.textRecords["com.twitter"]
              ? `https://twitter.com/${removeAtSign(
                  profile.textRecords["com.twitter"]
                )}`
              : undefined
          }
        />
        <Chip
          src="/images/icon/discord.png"
          content={profile.textRecords["com.discord"]}
        />
        <Chip
          src="/images/icon/telegram.png"
          content={profile.textRecords["org.telegram"]}
          contentLink={
            profile.textRecords["org.telegram"]
              ? `https://t.me/${removeAtSign(
                  profile.textRecords["org.telegram"]
                )}`
              : undefined
          }
        />
        <Chip
          src="/images/icon/github.png"
          content={profile.textRecords["com.github"]}
          contentLink={
            profile.textRecords["com.github"]
              ? `https://github.com/${removeAtSign(
                  profile.textRecords["com.github"]
                )}`
              : undefined
          }
        />
      </Box>
    </Box>
  );
};

export default SocialProfilesSection;
