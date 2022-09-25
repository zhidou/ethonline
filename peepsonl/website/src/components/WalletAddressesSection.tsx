import { Box } from "@mui/material";
import React from "react";
import ProfileContext from "../common/ProfileContext";
import Chip from "./Chip";
import SectionTitle from "./SectionTitle";

const WalletAddressesSection: React.FC = () => {
  const profile = React.useContext(ProfileContext);

  return (
    <Box sx={{ px: 3, my: 4 }}>
      <SectionTitle icon="📫" title="Wallet addresses" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip
          src="/images/icon/eth.png"
          content={profile.addresses[60]}
          ellipsised
        />
        <Chip
          src="/images/icon/btc.png"
          content={profile.addresses[0]}
          ellipsised
        />
        <Chip
          src="/images/icon/ltc.png"
          content={profile.addresses[2]}
          ellipsised
        />
        <Chip
          src="/images/icon/doge.png"
          content={profile.addresses[3]}
          ellipsised
        />
      </Box>
    </Box>
  );
};

export default WalletAddressesSection;
