import React, { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "./useForm";

const Register = () => {
  const { handleSubmit, values, handleChange } = useForm();
  return (
    <form
      className="form-style"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      id="registered"
    >
      <h1 class="sub-header center-align unselectable">Sign Up</h1>
      <span className="block-align">
        <label htmlFor="email" className="form-label white-text unselectable">
          Email:
        </label>
        <input
          type="email"
          name="email"
          className="form-input-text unselectable"
          placeholder="Enter Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </span>
      <span className="block-align">
        <button
          type="submit"
          className="form-input-button unselectable center-align"
        >
          Send Verification
        </button>
      </span>
      <span className="block-align">
        <h4 className="sub-title white-text center-align unselectable">
          Already have an account?{" "}
          {
            <Link to="/login" className="text-red">
              Login
            </Link>
          }
        </h4>
      </span>
    </form>
  );
};

export default Register;
