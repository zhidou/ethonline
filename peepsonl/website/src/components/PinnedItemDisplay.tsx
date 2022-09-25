import { Box, ButtonBase, Tooltip, Typography } from "@mui/material";
import React from "react";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import OpenInNewTwoToneIcon from "@mui/icons-material/OpenInNewTwoTone";
import { useSnackbar } from "notistack";
import useCopyToClipboard from "../common/useCopyToClipboard";
import { ellipsis, ELLIPSIS_LENGTH } from "./Chip";
import ProfileContext, {
  Addresses,
  PinableKeys,
  PINABLE_KEYS,
  PINABLE_NAME_ICON_MAP,
  Profile,
  TextRecords,
} from "../common/ProfileContext";
import { removeAtSign } from "../common/utils";

enum PinnedItemType {
  ADDRESS = 0,
  TEXT = 1,
  CONTENT = 2,
}
export interface PinnedItem {
  t: PinnedItemType;
  k: PinableKeys;
}

interface PinnedItemProps {
  item: PinnedItem;
}

function resolvePinnedItem(
  item: PinnedItem,
  profile: Profile
): null | { content: string; contentLink?: string } {
  if (!PINABLE_KEYS.includes(item.k)) return null;

  if (item.t === PinnedItemType.TEXT) {
    switch (item.k) {
      case "com.github": {
        if (!profile.textRecords["com.github"]) return null;
        return {
          content: profile.textRecords["com.github"],
          contentLink: `https://github.com/${removeAtSign(
            profile.textRecords["com.github"]
          )}`,
        };
      }
      case "com.reddit": {
        if (!profile.textRecords["com.reddit"]) return null;
        return {
          content: profile.textRecords["com.reddit"],
          contentLink: `https://reddit.com/user/${removeAtSign(
            profile.textRecords["com.reddit"]
          )}`,
        };
      }
      case "com.twitter": {
        if (!profile.textRecords["com.twitter"]) return null;
        return {
          content: profile.textRecords["com.twitter"],
          contentLink: `https://twitter.com/${removeAtSign(
            profile.textRecords["com.twitter"]
          )}`,
        };
      }
      case "org.telegram": {
        if (!profile.textRecords["org.telegram"]) return null;
        return {
          content: profile.textRecords["org.telegram"],
          contentLink: `https://t.me/${removeAtSign(
            profile.textRecords["org.telegram"]
          )}`,
        };
      }
      case "url": {
        if (!profile.textRecords.url) return null;
        return {
          content: profile.textRecords.url,
          contentLink: profile.textRecords.url,
        };
      }
    }

    if (!profile.textRecords[item.k as keyof TextRecords]) return null;
    return {
      content: profile.textRecords[item.k as keyof TextRecords]!,
    };
  }

  if (item.t === PinnedItemType.ADDRESS) {
    if (!profile.addresses[item.k as keyof Addresses]) return null;
    return {
      content: `${profile.addresses[item.k as keyof Addresses]!}`,
    };
  }

  if (item.t === PinnedItemType.CONTENT) {
    // TODO: implementation
    return null;
  }

  return null;
}

const PinnedItemDisplay: React.FC<PinnedItemProps> = ({ item }) => {
  const profile = React.useContext(ProfileContext);
  const [, copy] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  const resolvedItem = React.useMemo(
    () => resolvePinnedItem(item, profile),
    [item, profile]
  );

  const handleClick = React.useCallback(() => {
    if (!resolvedItem) return;

    if (!resolvedItem.contentLink) {
      copy(resolvedItem.content);
      enqueueSnackbar("Copied.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }
    window.open(resolvedItem.contentLink, "_blank");
  }, [copy, resolvedItem, enqueueSnackbar]);

  if (!resolvedItem) return null;

  return (
    <Box
      component={ButtonBase}
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
        borderRadius: 2,
        p: 2,
        mb: 3,
        boxShadow: "0 8px 16px 0 rgb(145 158 171 / 16%)",
      }}
    >
      <Box
        component="img"
        src={PINABLE_NAME_ICON_MAP[item.k].iconUrl}
        sx={{
          width: 32,
          height: 32,
          mr: 2,
          borderRadius: "10px",
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "0.8em" }}>
          {PINABLE_NAME_ICON_MAP[item.k].title}
        </Typography>
        <Tooltip
          title={item.t === 0 ? resolvedItem.content : ""}
          placement="top-start"
        >
          <Typography>
            {item.t === 0
              ? ellipsis(resolvedItem.content)
              : resolvedItem.content}
          </Typography>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {resolvedItem.contentLink ? (
          <OpenInNewTwoToneIcon fontSize="small" />
        ) : (
          <ContentCopyTwoToneIcon fontSize="small" />
        )}
      </Box>
    </Box>
  );
};

export default PinnedItemDisplay;
