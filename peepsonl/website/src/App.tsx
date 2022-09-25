import { Box, Container, Tab, Tabs } from "@mui/material";
import React from "react";
import styles from "./App.module.css";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import UserContext, { useUser } from "./common/UserContext";
import TabProfile from "./components/TabProfile";
import TabTimeline from "./components/TabTimeline";
import TabNFT from "./components/TabNFT";
import { useSearchParams } from "react-router-dom";
import ProfileContext, { useProfile } from "./common/ProfileContext";
import WalletContext, { useWallet } from "./common/WalletContext";

const tabNameMap = {
  profile: 0,
  timeline: 1,
  nft: 2,
  0: "profile",
  1: "timeline",
  2: "nft",
};

function App() {
  const user = useUser();
  const profile = useProfile(user.ens);
  const wallet = useWallet();
  const [searchParam, setSearchParam] = useSearchParams();

  const setTab = React.useCallback(
    (val: 0 | 1 | 2) => {
      setSearchParam({ tab: tabNameMap[val] });
    },
    [setSearchParam]
  );

  const tabName = (searchParam.get("tab") ?? "profile") as
    | "profile"
    | "timeline"
    | "nft";
  const tab = tabNameMap[tabName];

  const handleChange = (event: React.SyntheticEvent, newValue: 0 | 1 | 2) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    // var favicon_images = ["images/logo1.png", "images/logo2.png"],
    //   image_counter = 0; // To keep track of the current image
    // setInterval(function () {
    //   // remove current favicon
    //   if (document.querySelector("link[rel='icon']") !== null)
    //     document.querySelector("link[rel='icon']")!.remove();
    //   if (document.querySelector("link[rel='shortcut icon']") !== null)
    //     document.querySelector("link[rel='shortcut icon']")!.remove();
    //   // add new favicon image
    //   document
    //     .querySelector("head")!
    //     .insertAdjacentHTML(
    //       "beforeend",
    //       '<link rel="icon" href="' +
    //         favicon_images[image_counter] +
    //         '"  type="image/png">'
    //     );
    //   // If last image then goto first image
    //   // Else go to next image
    //   if (image_counter === favicon_images.length - 1) image_counter = 0;
    //   else image_counter++;
    // }, 2000);
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ProfileContext.Provider value={profile}>
        <WalletContext.Provider value={wallet}>
          <Box className={styles.app}>
            <Container
              fixed
              maxWidth="sm"
              sx={{ borderRadius: 2, backgroundColor: "white" }}
            >
              <Box
                sx={{
                  height: "100%",
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Header />
                <HeroSection />
                <Tabs
                  value={tab}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  sx={{ paddingX: 3, mt: 1 }}
                >
                  <Tab label="Profile" />
                  <Tab label="Timeline" />
                  <Tab label="NFT" />
                </Tabs>
                <Box sx={{ flex: 1 }}>
                  {tab === 0 && <TabProfile />}
                  {tab === 1 && <TabTimeline />}
                  {tab === 2 && <TabNFT />}
                </Box>
                <Footer />
              </Box>
            </Container>
          </Box>
        </WalletContext.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
