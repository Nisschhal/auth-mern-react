import { motion } from "framer-motion";
import { User, Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  // handle sign up form submit
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      className={`max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <h1
          className={`mb-6 bg-gradient-to-r from-green-300 to-emerald-400 text-3xl font-bold text-center text-transparent bg-clip-text`}
        >
          Create Account
        </h1>

        {/* // SIGN UP FORM */}
        <form onSubmit={handleSignup}>
          {/* INPUT: FULLNAME */}
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* INPUT: EMAIL */}
          <Input
            icon={Mail}
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* INPUT: FULLNAME */}
          <Input
            icon={Lock}
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error state show */}
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          {/* Password strength meter */}
          <PasswordStrengthMeter password={password} />

          {/* Submit button */}
          <motion.button
            className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="size-6 text-center mx-auto animate-spin" />
            ) : (
              "Sign up"
            )}
          </motion.button>
        </form>
      </div>

      {/* Already have an account */}
      <div className="px-8 py-4 flex justify-center bg-gray-900 bg-opacity-50 rounded-b-2xl">
        <p className="text-sm text-gray-400">
          Already have an account?
          <Link className="text-green-400 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
