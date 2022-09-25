import { Box, ButtonBase, Skeleton, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import useCopyToClipboard from "../common/useCopyToClipboard";

export const ELLIPSIS_LENGTH = 14;

export function ellipsis(s: string) {
  if (s.length <= ELLIPSIS_LENGTH) return s;
  return (
    s.substring(0, ELLIPSIS_LENGTH / 2) +
    "..." +
    s.substring(s.length - ELLIPSIS_LENGTH / 2, s.length)
  );
}

interface ChipProps {
  src: string;
  content: string | null | undefined;
  contentLink?: string;
  ellipsised?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  src,
  content,
  contentLink,
  ellipsised = false,
}) => {
  const [, copy] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = React.useCallback(() => {
    if (content === null || content === undefined) return;

    if (!contentLink) {
      copy(content);
      enqueueSnackbar("Copied.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    window.open(contentLink, "_blank");
  }, [copy, content, enqueueSnackbar, contentLink]);

  return (
    <Box
      component={ButtonBase}
      disabled={content === null || content === undefined}
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px 0 rgb(145 158 171 / 16%)",
        borderRadius: 8,
        py: 1,
        px: 2,
        mr: 2,
        mb: 1,
        opacity: content === null ? 0.6 : 1,
      }}
    >
      <Box
        component="img"
        src={src}
        sx={{
          width: 24,
          height: 24,
        }}
      />
      {content === undefined ? (
        <Skeleton variant="text" width={144} sx={{ ml: 1 }} />
      ) : (
        <Typography
          sx={{ ml: 1, color: "#545558", minWidth: ellipsised ? 144 : "unset" }}
        >
          {content === null
            ? "unknown"
            : ellipsised
            ? ellipsis(content)
            : content}
        </Typography>
      )}
    </Box>
  );
};

export default Chip;
