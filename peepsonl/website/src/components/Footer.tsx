import { Box, Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        pt: 8,
        pb: 4,
        textAlign: "center",
        color: "rgba(0,0,0,0.6)",
        // backgroundColor: "#fafafa",
      }}
    >
      <Typography sx={{ fontSize: "0.8em" }} color="default">
        Made by peeps with <span style={{ color: "black" }}>❤️</span>
      </Typography>
      <Typography sx={{ fontSize: "0.8em" }} color="default">
        ©️2022 peepsonl
      </Typography>
    </Box>
  );
};

export default Footer;
