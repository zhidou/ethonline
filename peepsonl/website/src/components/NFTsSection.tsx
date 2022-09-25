import { Box, Typography } from "@mui/material";
import React from "react";

const NFTsSection: React.FC = () => {
  return (
    <>
      <Box my={2}>
        <Typography variant="h6" color="#1f3169">
          NFTs
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        <Box
          component="img"
          src="https://lh3.googleusercontent.com/89_2if9V32GqM0fkcmZuZYd8BVTgxKUnPEr3dI0ARW497pZw6PIh7eMHEnPPBwTxgpJ9pTSiuyPrMstKpYDCgva_hG3NnG40HBpZ=w720"
          sx={{
            width: 132,
            height: 132,
            mr: 2,
            borderRadius: "10px",
          }}
        />
        <Box
          component="img"
          src="/images/nft1.png"
          sx={{
            width: 132,
            height: 132,
            mr: 2,
            borderRadius: "10px",
          }}
        />
        <Box
          component="img"
          src="/images/nft2.png"
          sx={{
            width: 132,
            height: 132,
            borderRadius: "10px",
          }}
        />
      </Box>
    </>
  );
};

export default NFTsSection;
