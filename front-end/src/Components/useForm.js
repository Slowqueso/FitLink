import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";

const useForm = (
  validateEmail,
  validateOTP,
  validateUser,
  validateAccount,
  validateLogin,
  active
) => {
  const [values, setValues] = useState({
    email: "",
    OTP: "",
    username: "",
    password: "",
    confirmation: "",
    fname: "",
    lname: "",
    day: "",
    month: "",
    year: "",
  });
  let history = useHistory();
  const [otpConfirmation, setOtpConfirmation] = useState();
  const [otpState, setOtpState] = useState(null);
  const [registerState, setRegisterState] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setError({});
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  //Signup Control

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError(validateEmail(values));
    if (validateEmail(values).isValidated) {
      axios
        .post("http://localhost:8001/emailverification", {
          email: values.email,
        })
        .then((response) => {
          setRegisterState("registered");
          setSubmitted(true);
          setOtpConfirmation(response.data.OTP);
        })
        .catch((err) => {
          setError({ email: "User already exists" });
        });
    }
  };
  useEffect(() => {
    setOtpState(true);
  }, [otpConfirmation]);

  useEffect(() => {}, [otpState]);

  const handleOTPSubmit = (e) => {
    setError({});
    e.preventDefault();
    setError(validateOTP(values));
    if (validateOTP(values).isValidated) {
      if (values.OTP === otpConfirmation.toString()) {
        setRegisterState("verified");
        setSubmitted(true);
      } else if (values.OTP !== otpConfirmation.toString()) {
        setError({ OTPerror: "Invalid OTP!" });
      }
    }
  };

  const handleUserSubmit = (e) => {
    setError({});
    e.preventDefault();
    setError(validateUser(values));
    if (validateUser(values).isValidated) {
      axios
        .post("http://localhost:8001/usernameverification", {
          username: values.username,
        })
        .then((response) => {
          if (response.data) {
            setRegisterState("created");
            setSubmitted(true);
          } else {
            setError({
              userError: {
                username: "Username is already taken!",
              },
            });
          }
        })
        .catch((err) => {
          setError({ userError: { username: "Username is already taken!" } });
        });
    }
  };

  // Login Control
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState({});
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
    OTP: "",
    confirmOTP: "",
  });
  const [testState, setTestState] = useState();
  const [loginOTP, setLoginOTP] = useState();
  const [loginOTPState, setLoginOTPState] = useState(null);
  const getPfp = async (username) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/getProfile",
        username
      );
      localStorage.setItem("profileImage", res.data.profileImage);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(validateLogin(loginValues));
    if (validateLogin(loginValues).isValidated) {
      axios
        .post("http://localhost:8001/login", {
          username: loginValues.username,
          password: loginValues.password,
        })
        .then(async (response) => {
          const { username, email, dob, fname, token, profileImage } =
            response.data;
          const userLogin = {
            username,
            email,
            dob,
            fname,
            token,
            isLoggedIn: true,
          };
          if (response.data.OTP) {
            validateAccount(true);
            // localStorage.setItem("userLogin", JSON.stringify(userLogin));
            localStorage.setItem("username", userLogin.username);
            if (response.data.success) {
              setTestState(userLogin);
            }
          } else {
            if (response.data.success) {
              localStorage.setItem("userToken", JSON.stringify(token));
              localStorage.setItem("userLogin", JSON.stringify(userLogin));
              localStorage.setItem(
                "profileImage",
                JSON.stringify(profileImage)
              );
              history.push("/Home");
              // history.goBack();
              getPfp(username);
            }
          }
        })
        .catch((err) => {
          if (err.response.data.type === "password") {
            setLoginError({
              userError: {
                password: err.response.data.msg,
              },
            });
          } else {
            setLoginError({
              userError: {
                username: err.response.data.msg,
              },
            });
          }
          console.log(err);
        });
    }
  };
  let test = loginOTP;
  // useEffect(() => {
  //   setOtpState(loginOTP);
  //   test = loginOTP;
  // }, [loginOTP]);

  // useEffect(() => {}, [loginOTPState]);
  const [counter, setCounter] = useState(0);
  // const handleLoginOTP = (e) => {
  //   setCounter(counter + 1);
  //   setError({});
  //   e.preventDefault();
  //   if (loginValues.OTP === otpConfirmation.toString()) {
  //     history.push("/Home");
  //   } else if (values.OTP !== otpConfirmation.toString()) {
  //     if (counter >= 3) {
  //       localStorage.setItem("profileImage", null);
  //       localStorage.setItem("userToken", null);
  //       localStorage.setItem(
  //         "userLogin",
  //         JSON.stringify({ isLoggedIn: false })
  //       );
  //       window.location.reload();
  //       setError({ OTPerror: "Invalid OTP!" });
  //     }
  //   }
  // };

  const handleAccountCreation = (e) => {
    setError({});
    e.preventDefault();
    setError(validateAccount(values));
    if (validateAccount(values).isValidated) {
      axios
        .post("http://localhost:8001/signup", {
          email: values.email,
          password: values.password,
          username: values.username,
          fname: values.fname,
          lname: values.lname,
          day: values.day,
          month: values.month,
          year: values.year,
        })
        .then((response) => {
          const { username, email, dob, fname, token } = response.data;
          const userLogin = {
            username,
            email,
            dob,
            fname,
            token,
            isLoggedIn: true,
          };
          localStorage.setItem("userToken", JSON.stringify(token));
          localStorage.setItem("userLogin", JSON.stringify(userLogin));
          history.push("/Home");
          // history.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    setLoginError({});
  }, [loginValues, user]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  return {
    values,
    registerState,
    error,
    handleChange,
    handleEmailSubmit,
    handleOTPSubmit,
    handleUserSubmit,
    handleAccountCreation,
    loginValues,
    handleLogin,
    handleLoginChange,
    loginError,
    // handleLoginOTP,
  };
};

export default useForm;
