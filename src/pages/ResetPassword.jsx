import { motion } from "framer-motion";
import { Loader, Lock } from "lucide-react";
import Input from "../components/Input";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const ResetPassword = () => {
  const navigate = useNavigate();
  // password holders
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // get resetPassword function from authstore
  const { resetPassword, isloading } = useAuthStore();
  const params = useParams();
  // extract token from the url
  const { token } = params;

  // form handler to reset passward
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    // check password match
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      // invoke reset function from the authstore
      await resetPassword(token, password);
      toast.success(
        "Password Changed Successfully!, redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error resetting password!");
      throw error;
    }
  };
  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 rounded-xl backdrop-filter backdrop-blur-xl shadow-lg p-8">
      {/* Heading: Reset Password */}
      <div className="text-3xl  text-center font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text mb-8 ">
        Reset Password
      </div>
      <form onSubmit={handleSubmit} className="">
        {/* Input Field Password */}
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          type="password"
          placeholder="New Password"
          required
        />
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={Lock}
          type="password"
          placeholder="Confirm New Password"
          required
        />
        {/* Password meter to suggest new strong password */}
        <PasswordStrengthMeter password={password} />
        {/* Submit button */}
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          type="submit"
          disabled={isloading}
          className="w-full px-4 py-3  text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
        >
          {isloading ? (
            <Loader className="size-8 mx-auto animate-spin" />
          ) : (
            "Set New Password"
          )}
        </motion.button>
      </form>

      {/* Footer  */}
    </div>
  );
};

export default ResetPassword;
