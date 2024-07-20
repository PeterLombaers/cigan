import React from "react";

export default function OpponentTitle({ round, title, setTitle }) {
  return (
    <div className="opponents-title">
      <label htmlFor={"opponents-title-" + round}>Title</label>
      <select
        name="opponents-title"
        id={"opponents-title-" + round}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        <option value=""></option>
        <option value="GM">GM</option>
        <option value="IM">IM</option>
        <option value="FM">FM</option>
        <option value="WGM">WGM</option>
        <option value="WIM">WIM</option>
        <option value="WFM">WFM</option>
      </select>
    </div>
  );
}
