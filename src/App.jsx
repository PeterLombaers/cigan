import React, { useState } from "react";
import Input from "./Input";
import Requirements from "./Requirements";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

function App() {
  const [nRounds, setNRounds] = useState(9);
  const [normType, setNormType] = useState("GM");
  const [opponents, setOpponents] = useState([
    { round: 1, rating: 0, result: "" },
    { round: 2, rating: 0, result: "" },
    { round: 3, rating: 0, result: "" },
    { round: 4, rating: 0, result: "" },
    { round: 5, rating: 0, result: "" },
    { round: 6, rating: 0, result: "" },
    { round: 7, rating: 0, result: "" },
    { round: 8, rating: 0, result: "" },
    { round: 9, rating: 0, result: "" },
    { round: 10, rating: 0, result: "" },
    { round: 11, rating: 0, result: "" },
    { round: 12, rating: 0, result: "" },
    { round: 13, rating: 0, result: "" },
  ]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant="h1">Can I Get A Norm?</Typography>
      <Stack direction="row" spacing={2}>
        <Input
          nRounds={nRounds}
          setNRounds={setNRounds}
          normType={normType}
          setNormType={setNormType}
          opponents={opponents}
          setOpponents={setOpponents}
        />
        <Requirements
          nRounds={nRounds}
          opponents={opponents.slice(0, nRounds)}
          normType={normType}
        />
      </Stack>
    </React.Fragment>
  );
}

export default App;
