import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import URLS from "../utils/urls/urls";
import axios from "../Axios/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = userLoginDetails;
    try {
      const response = await axios.post(URLS.login, body);
      console.log(response);
      if (response.data.statusCode === "201") {
        alert("Login Successfull");
        localStorage.setItem("token", response.data.token);
        navigate("/account");
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="flex justify-center grow mt-10 ">
      <div>
        <div className="font-bold text-4xl mb-4 text-center ">Login</div>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@gmail.com"
            value={userLoginDetails.email}
            onChange={(e) => {
              setUserLoginDetails({
                ...userLoginDetails,
                email: e.target.value,
              });
            }}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={userLoginDetails.password}
            onChange={(e) => {
              setUserLoginDetails({
                ...userLoginDetails,
                password: e.target.value,
              });
            }}
          />
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
            {" "}
            Login In
          </button>
          <div className="text-center py-2 text-gray-500">
            {`Don't have a account yet?`}
            <Link to={"/register"} className="underline text-black">
              {" "}
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
