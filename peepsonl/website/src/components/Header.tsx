import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import WidgetsTwoToneIcon from "@mui/icons-material/WidgetsTwoTone";
import React from "react";
import WalletContext from "../common/WalletContext";

const Header: React.FC = () => {
  const { signer, connectWallet, disconnectWallet } =
    React.useContext(WalletContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 9,
        paddingY: 2,
        px: 2,
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/images/logo.gif"
          sx={{ width: 32, height: 32, marginRight: 1 }}
        />
        <Typography
          sx={{
            fontFamily: "'Gloria Hallelujah', cursive",
            fontSize: "1.6em",
            fontWeight: "bold",
          }}
        >
          peeps onl
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {!signer ? (
          <IconButton aria-label="delete" onClick={connectWallet}>
            <AccountBalanceWalletTwoToneIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" onClick={openMenu}>
            <WidgetsTwoToneIcon />
          </IconButton>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={}>Update profile</MenuItem> */}
        <MenuItem onClick={disconnectWallet}>Disconnet</MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
