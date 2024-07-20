import React from "react";

export default function RatingRequirement({ points, requiredRating }) {
  let identifierString = points.toFixed(1).toString().replace(".", "");
  return (
    <div className={"rating-req rating-req-" + identifierString}>
      <div className={"rating-req-score rating-req-score-" + identifierString}>
        {points} points
      </div>
      <p> against an average opposition of </p>
      <div className={"rating-req-rating rating-req-rating-" + identifierString}>
        {requiredRating.toFixed(1)}
      </div>
    </div>
  );
}
