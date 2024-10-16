import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    post: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  const handleDownload = async (token) => {
    try {
      const { data, headers } = await axios.get(
        "http://localhost:5000/api/user/download-certificate",
        {
          responseType: "blob",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log(data, headers);
      const fileName =
        headers["content-disposition"]
          ?.split("filename=")[1]
          ?.replace(/"/g, "") || "offer_letter.pdf";
      const blob = new Blob([data], {
        type: headers["content-type"] || "application/pdf",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    const message = err.response?.data?.message || "An error occurred.";
    setError(message);
    if (err.response?.status === 401) navigate("/login");
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );
      console.log("Registration data:", data); // Log registration data to verify it has a token
      if (data.token) {
        localStorage.setItem("userToken", data.token);
        setUser(data.user);
        setTimeout(async () => {
          await handleDownload(data.token);
        }, 1000); // Call download with the retrieved token
        navigate('/Course');
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm"
      >
        <img src="./logo.png" className="h-20 mx-auto mb-4" alt="logo" />
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {["name", "email", "phone", "post", "password"].map((field, index) => (
          <div className="mb-4" key={index}>
            <label
              htmlFor={field}
              className="block text-gray-700 mb-2 capitalize"
            >
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
