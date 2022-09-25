import React from "react";
import WalletAddressesSection from "./WalletAddressesSection";
import SocialProfilesSection from "./SocialProfilesSection";
import NFTsSection from "./NFTsSection";
import PinnedSection from "./PinnedSection";
import { Alert, Box } from "@mui/material";
import ProfileContext from "../common/ProfileContext";
import UserContext from "../common/UserContext";

const TabProfile: React.FC = () => {
  const user = React.useContext(UserContext);
  const profile = React.useContext(ProfileContext);

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <PinnedSection />
      {/* <NFTsSection /> */}
      <SocialProfilesSection />
      <WalletAddressesSection />
      {profile.textRecords.notice && (
        <Box
          component={Alert}
          mt={2}
          width="100%"
          severity="info"
          sx={{ position: "sticky", bottom: 8 }}
        >
          {user.uid || user.ens || user.address}: {profile.textRecords.notice}
        </Box>
      )}
    </Box>
  );
};

export default TabProfile;
