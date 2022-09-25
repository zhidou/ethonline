import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNFTOwnedByAccount } from "../common/nftport";
import UserContext from "../common/UserContext";
import SectionTitle from "./SectionTitle";
import TabNFTItem from "./TabNFTItem";
import TabNFTItemSkeleton from "./TabNFTItemSkeleton";

const TabNFT = () => {
  const user = React.useContext(UserContext);
  const assets = useNFTOwnedByAccount(user.address);

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        backgroundColor: "white",
      }}
    >
      <SectionTitle icon="🏆" title="Top 50 NFTs" />
      {assets && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {assets.map((asset) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={`${asset.contractAddress}-${asset.tokenId}`}
            >
              <TabNFTItem info={asset} />
            </Grid>
          ))}
        </Grid>
      )}
      {!assets && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(3)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <TabNFTItemSkeleton />
            </Grid>
          ))}
        </Grid>
      )}
      <Box
        component={Typography}
        sx={{ mt: 2, color: "rgba(0,0,0,0.45)", fontSize: "0.6em" }}
      >
        * Data source:{" "}
        <a href="https://www.nftport.xyz/" target="_blank" rel="noreferrer">
          NFTPort
        </a>
        .
      </Box>
    </Box>
  );
};

export default TabNFT;
