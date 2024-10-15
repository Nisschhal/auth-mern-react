import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;
  const { login, error } = useAuthStore();

  // when logged in click
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.log(`Error login: ${error.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      {/* // heading: LOGIN */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-br from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h1>
        {/* form */}
        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* PASSWORD */}
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* FORGET PASSWORD LINK */}
          <div className="flex item-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forget Password?
            </Link>
          </div>

          {/* Error  */}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* LOGIN BUTTON   */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full  py-3 px-4 bg-gradient-to-r from-green-500 to bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:rign-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="size-6 text-center mx-auto animate-spin" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>

      {/* NO ACCOUNT: link to sign up */}
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Don't have an account? </p>
        <Link to="/signup" className="text-green-400 hover:underline">
          Sign up
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
