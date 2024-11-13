import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Axios/axiosInstance";
import URLS from "../utils/urls/urls";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = userDetails;
    try {
      const response = await axios.post(URLS.register, body);

      if (response && response.data.statusCode == "201") {
        alert("Registration Successfull!");
        navigate("/account");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center grow mt-10 ">
      <div>
        <div className="font-bold text-4xl mb-4 text-center ">Register1</div>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="full name"
            value={userDetails.fullName}
            onChange={(e) => {
              setUserDetails({ ...userDetails, fullName: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="your@gmail.com"
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={userDetails.password}
            onChange={(e) => {
              setUserDetails({ ...userDetails, password: e.target.value });
            }}
          ></input>
          <div className="p-2">
            <input
              type="checkbox"
              onClick={(e) => {
                setShowPassword(!showPassword);
              }}
              className=" cursor-pointer"
            />
            <span className="ml-2">Show Password</span>
          </div>

          <button className="primary my-2" type="submit">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            {`Already a member?`}
            <Link to={"/login"} className="underline text-black ml-1">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
