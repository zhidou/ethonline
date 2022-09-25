import { Box, Typography } from "@mui/material";
import React from "react";

interface SectionTitleProps {
  title: string;
  icon?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => {
  return (
    <Box mb={2}>
      <Typography>
        <span>{icon}</span>{" "}
        <span style={{ color: "rgba(14,15,52, 0.73)" }}>{title}</span>
      </Typography>
    </Box>
  );
};

export default SectionTitle;
