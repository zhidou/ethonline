import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

interface TabNFTItemSkeletonProps {}

const TabNFTItemSkeleton: React.FC<TabNFTItemSkeletonProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 8px 16px 0 rgb(145 158 171 / 16%)",
        borderRadius: 1,
        py: 1,
      }}
    >
      <Skeleton variant="rectangular" width={"80%"} height={120} />
      <Box
        component={Skeleton}
        variant="text"
        sx={{
          width: "80%",
          mt: 1,
        }}
      />
    </Box>
  );
};

export default TabNFTItemSkeleton;
