import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Type({ normType, setNormType }) {
  const handleNormType = (event, newNormType) => {
    if (newNormType !== null) {
      setNormType(newNormType);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={normType}
      exclusive
      onChange={handleNormType}
      aria-label="norm type"
    >
      <ToggleButton value="GM" aria-label="GM norm">
        GM
      </ToggleButton>
      <ToggleButton value="IM" aria-label="IM norm">
        IM
      </ToggleButton>
      <ToggleButton value="WGM" aria-label="WGM norm">
        WGM
      </ToggleButton>
      <ToggleButton value="WIM" aria-label="WIM norm">
        WIM
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
