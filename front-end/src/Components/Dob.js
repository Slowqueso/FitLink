import React, { useEffect } from "react";
import useForm from "./useForm";

let DisplayDates = () => {
  let output = [];
  for (let i = 1; i < 32; i++) {
    output.push(i.toString());
  }
  return output;
};

const sideMargin = {
  margin: "0px 10px",
};
const Dob = () => {
  const { handleChange, values } = useForm();
  return (
    <div className="flex-container-sb">
      <select
        name="day"
        className="form-input-text unselectable"
        style={sideMargin}
        onChange={handleChange}
        value={values.day}
      >
        <option value={null}>Date</option>
        {DisplayDates().map((i) => {
          return (
            <option key={Number(i)} value={i}>
              {i}
            </option>
          );
        })}
      </select>
      <select
        name="month"
        className="form-input-text unselectable"
        style={sideMargin}
        onChange={handleChange}
        value={values.month}
      >
        <option value={null}>Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <input
        type="text"
        name="year"
        className="form-input-text unselectable"
        placeholder="Year"
        value={values.year}
        style={sideMargin}
        onChange={handleChange}
      />
    </div>
  );
};

export default Dob;
