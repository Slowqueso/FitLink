import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const user = JSON.parse(localStorage.getItem("userLogin"));

const useModalForm = (validateUser) => {
  const [values, setValues] = useState({
    username: user.username,
    desc: "",
  });

  const [imageFile, setImageFile] = useState("test1");
  const [fileName, setFileName] = useState("test2");

  //On Save

  //Return
  return {
    values,
    handleChange,
    onFileUpload,
    onProfileSave,
    fileName,
    imageFile,
    setImageFile,
  };
};

export default useModalForm;
