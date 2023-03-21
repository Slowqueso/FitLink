import React from "react";
import useForm from "./useForm";

const User = () => {
  const { handleSubmit, values, handleChange } = useForm();
  return (
    <form className="form-style" onSubmit={handleSubmit} id="created">
      <span className="block-align bottom-space">
        <label
          htmlFor="username"
          className="form-label white-text unselectable"
        >
          Username:
        </label>
        <input
          type="text"
          name="username"
          className="form-input-text unselectable"
          placeholder="Enter Username"
          required
          value={values.username}
          onChange={handleChange}
        />
      </span>
      <span className="block-align bottom-space">
        <label
          htmlFor="password"
          className="form-label white-text unselectable"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          className="form-input-text unselectable"
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </span>
      <span className="block-align bottom-space">
        <label
          htmlFor="confirmation"
          className="form-label white-text unselectable"
        >
          Re-type Password:
        </label>
        <input
          type="password"
          name="confirmation"
          className="form-input-text unselectable"
          placeholder="Confirm Password"
          required
          value={values.confirmation}
          onChange={handleChange}
        />
      </span>
      <span className="block-align">
        <button
          type="submit"
          className="form-input-button center-align unselectable"
        >
          Submit
        </button>
      </span>
    </form>
  );
};

export default User;
