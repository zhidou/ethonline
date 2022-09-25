import { Box } from "@mui/material";
import React from "react";
import SectionTitle from "./SectionTitle";
import PinnedItemDisplay, { PinnedItem } from "./PinnedItemDisplay";
import ProfileContext from "../common/ProfileContext";

const PinnedSection: React.FC = () => {
  const profile = React.useContext(ProfileContext);
  const pinnedTextRecord = profile.textRecords["onl.peeps.profile.pinned"];

  const pinnedItems = React.useMemo(() => {
    if (!pinnedTextRecord) return [];
    let parsed: PinnedItem[];
    try {
      parsed = JSON.parse(pinnedTextRecord);
    } catch {
      return [];
    }

    return parsed;
  }, [pinnedTextRecord]);

  if (pinnedItems.length === 0) return null;

  return (
    <Box sx={{ px: 3, mt: 4, mb: 3 }}>
      <SectionTitle icon="📌" title="Pinned" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {pinnedItems.map((item) => (
          <PinnedItemDisplay key={item.k} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default PinnedSection;
