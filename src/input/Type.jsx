import React from "react";

export default function Type({ normType, setNormType }) {
  return (
    <fieldset>
      <legend>What is the type of the norm?</legend>
      <ul>
        <li>
          <label htmlFor="norm-type-gm">GM</label>
          <input
            type="radio"
            id="norm-type-gm"
            name="norm-type"
            value="GM"
            onChange={() => setNormType("GM")}
            checked={normType === "GM"}
          />
        </li>
        <li>
          <label htmlFor="norm-type-im">IM</label>
          <input
            type="radio"
            id="norm-type-im"
            name="norm-type"
            value="IM"
            onChange={() => setNormType("IM")}
            checked={normType === "IM"}
          />
        </li>
        <li>
          <label htmlFor="norm-type-wgm">WGM</label>
          <input
            type="radio"
            id="norm-type-wgm"
            name="norm-type"
            value="WGM"
            onChange={() => setNormType("WGM")}
            checked={normType === "WGM"}
          />
        </li>
        <li>
          <label htmlFor="norm-type-wim">WIM</label>
          <input
            type="radio"
            id="norm-type-wim"
            name="norm-type"
            value="WIM"
            onChange={() => setNormType("WIM")}
            checked={normType === "WIM"}
          />
        </li>
      </ul>
    </fieldset>
  );
}
