import React from "react";

const CreateAccount = () => {
  return (
    <form className="form-style" onSubmit={handleUserSubmit}>
      <span className="block-align bottom-space">
        <label htmlFor="fname" className="form-label white-text unselectable">
          First Name:
        </label>
        <input
          type="text"
          name="fname"
          className="form-input-text unselectable"
          placeholder="Enter Name"
          value={values.fname}
          onChange={handleChange}
        />
      </span>
      <span className="block-align bottom-space">
        <label htmlFor="lname" className="form-label white-text unselectable">
          Last Name:
        </label>
        <input
          type="text"
          name="lname"
          className="form-input-text unselectable"
          placeholder="Enter Last Name"
          value={values.lname}
          onChange={handleChange}
        />
      </span>
      <span className="block-align bottom-space">
        <label htmlFor="dob" className="form-label white-text unselectable">
          Date of Birth:
        </label>
        <input
          type="date"
          name="dob"
          id="dob"
          className="form-input-text unselectable"
          required
        />
      </span>
      <span className="block-align">
        <button
          type="submit"
          className="form-input-button center-align unselectable"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default CreateAccount;
