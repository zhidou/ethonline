import { Box, Button, Chip, Skeleton, Typography } from "@mui/material";
import React from "react";
import useCopyToClipboard from "../common/useCopyToClipboard";
import UserContext from "../common/UserContext";
import styles from "./HeroSection.module.css";
import { useSnackbar } from "notistack";
import { ellipsis } from "./Chip";
import ProfileContext from "../common/ProfileContext";

const HeroSection = () => {
  const user = React.useContext(UserContext);
  const profile = React.useContext(ProfileContext);
  const [, copy] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box
      sx={{
        mt: 4,
        px: 3,
        // backgroundColor: "white",
        borderRadius: 1,
        // borderWidth: 1,
        // borderColor: "#e1c591",
        // borderStyle: "solid",
      }}
    >
      <Box
        sx={{ position: "relative", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
          }}
        >
          {profile.textRecords.avatar !== undefined ? (
            <Box
              component="img"
              src={profile.textRecords.avatar || "/images/avatar.png"}
              sx={{
                width: 120,
                height: "auto",
                borderRadius: "50%",
                borderWidth: 6,
                borderColor: "white",
                borderStyle: "solid",
                position: "relative",
              }}
            />
          ) : (
            <Skeleton variant="circular" width={120} height={120} />
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: "1.8em", fontWeight: "600" }}>
              {user.uid || user.ens || user.address}
            </Typography>
          </Button>
          <Box
            component={Chip}
            sx={{ mt: 1 }}
            label={
              <>
                <i className="cf cf-eth"></i>
                {user.address ? (
                  <span> {ellipsis(user.address)}</span>
                ) : (
                  <Skeleton variant="text" />
                )}
              </>
            }
            onClick={() => {
              if (!user.address) return;
              copy(user.address).then(() => {
                enqueueSnackbar("Address copied", {
                  variant: "success",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
              });
            }}
          />
          <Box
            sx={{
              mt: 2,
              backgroundColor: "#fafafa",
              borderRadius: 1,
              py: 0.5,
              px: 1,
              width: "100%",
            }}
          >
            <Typography component="blockquote">
              {profile.textRecords.description !== undefined ? (
                profile.textRecords.description === null ? (
                  <p style={{ opacity: 0.3 }}>No words was left.</p>
                ) : (
                  <p>{profile.textRecords.description}</p>
                )
              ) : (
                <Skeleton variant="text" />
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const HeroSection1: React.FC = () => {
  return (
    <Box
      className={styles["aspect-ratio-box"]}
      sx={{
        mt: 4,
        backgroundColor: "white",
        borderRadius: 4,
      }}
    >
      <Box
        className={styles["aspect-ratio-box-inside"]}
        sx={{
          py: 4,
          px: 2,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#95d0e1",
          // backgroundImage:
          // "url(https://st4.depositphotos.com/4259495/28125/v/450/depositphotos_281251164-stock-illustration-pastel-watercolor-backdrop-fashion-background.jpg)",
          // boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Box
            component="img"
            src="/images/avatar.png"
            sx={{
              width: 128,
              height: 128,
              borderRadius: 2,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h5" sx={{ mt: 1.5, position: "relative" }}>
            6oo6
          </Typography>
          <Typography variant="subtitle2">.pps.eth</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
