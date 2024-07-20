import React from "react";

export default function OpponentRating({ round, rating, setRating }) {
  return (
    <div className="opponent-rating">
      <label htmlFor={"opponent-rating-" + round}>Rating</label>
      <input
        type="number"
        id={"opponent-rating-" + round}
        name="opponent-rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
    </div>
  );
}
