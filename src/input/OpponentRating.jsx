import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";

// Measure the width of a piece of text.
const getTextWidth = (text, font) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

/**
 * Calculate the width that the text field should minimally have.
 *
 * The text field will either contain a four digit opponent rating or 'unrated'. However
 * if the input is wrong the field will get the label "rating or 'unrated'".
 */
const calculateTextFieldWidth = () => {
  const theme = useTheme();
  const fontSize = theme.typography.caption.fontSize;
  const fontFamily = theme.typography.fontFamily;
  return getTextWidth("rating or 'unrated'", `${fontSize}px ${fontFamily}`);
};

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
      variant="standard"
      value={rating}
      label="rating"
      helperText={error.helperText}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
      sx={{ width: calculateTextFieldWidth() * 1.7}}
    />
  );
}
