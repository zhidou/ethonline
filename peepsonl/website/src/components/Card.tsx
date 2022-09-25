import { Box, BoxProps } from "@mui/material";
import React, { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  sx,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        borderRadius: 4,
        boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Card;
