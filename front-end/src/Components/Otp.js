import React from "react";
import useForm from "./useForm";

const Otp = () => {
  const { handleSubmit, values, handleChange } = useForm();
  return (
    <form className="form-style" onSubmit={handleSubmit} id="verified">
      <h1 className="sub-header center-align unselectable">Verification</h1>
      <span className="block-align">
        <label htmlFor="OTP" className="form-label white-text unselectable">
          OTP:
        </label>
        <input
          type="text"
          name="OTP"
          className="form-input-text unselectable"
          placeholder="Enter OTP"
          required
          maxLength="6"
          value={values.OTP}
          onChange={handleChange}
        />
      </span>
      <span className="block-align">
        <button
          type="submit"
          className="form-input-button center-align unselectable"
        >
          Verify
        </button>
      </span>
      <span className="block-align">
        <h4 className="sub-title white-text center-align unselectable">
          Didn't receive an OTP?{" "}
          <span
            className="text-red"
            onMouseOver={(e) => (e.target.style.cursor = "pointer")}
          >
            Resend
          </span>
        </h4>
      </span>
    </form>
  );
};

export default Otp;
