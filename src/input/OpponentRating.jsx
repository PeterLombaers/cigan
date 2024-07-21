import React from "react";
import TextField from "@mui/material/TextField";

export default function OpponentRating({ round, rating, setRating }) {
  const [error, setError] = React.useState({
    hasError: false,
    helperText: null,
  });

  const handleChange = (input) => {
    if (input === "unrated") {
      setError({ hasError: false, helperText: null });
      setRating("unrated");
    } else {
      const inputRating = parseInt(input);
      if (isNaN(inputRating)) {
        setError({ hasError: true, helperText: "rating or 'unrated'" });
        setRating(null);
      } else {
        setError({ hasError: false, helperText: null });
        setRating(inputRating);
      }
    }
  };
  return (
    <TextField
      id={"rating-round-" + round}
      error={error.hasError}
      variant="outlined"
      value={rating}
      helperText={error.helperText}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
    />
  );
}
