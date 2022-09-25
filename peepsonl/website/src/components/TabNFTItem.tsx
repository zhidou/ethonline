import { Box, ButtonBase, Typography } from "@mui/material";
import React from "react";

export interface NFTInfo {
  contractAddress: string;
  contractName: string;
  tokenId: string;
  imageUrl: string;
  name: string;
}

interface TabNFTItemProps {
  info: NFTInfo;
}

const TabNFTItem: React.FC<TabNFTItemProps> = ({ info }) => {
  const openseaLink = `https://opensea.io/assets/ethereum/${info.contractAddress}/${info.tokenId}`;

  return (
    <Box
      component={ButtonBase}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 8px 16px 0 rgb(145 158 171 / 16%)",
        borderRadius: 1,
        py: 1,
        maxWidth: "100%",
      }}
      onClick={() => window.open(openseaLink, "_blank")}
    >
      <Box
        component="img"
        src={info.imageUrl}
        sx={{
          width: "80%",
          height: "auto",
          aspectRatio: "1",
          objectFit: "contain",
        }}
      />
      <Box
        component={Typography}
        sx={{
          width: "80%",
          mt: 1,
          textAlign: "left",
          fontSize: "0.8em",
          opacity: 0.73,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {info.contractName}
      </Box>
      <Box
        component={Typography}
        sx={{
          width: "80%",
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "0.8em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {info.name}
      </Box>
    </Box>
  );
};

export default TabNFTItem;
