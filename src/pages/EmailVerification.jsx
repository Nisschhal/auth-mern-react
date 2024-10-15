import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
const EmailVerification = () => {
  // for input reference
  const inputRefs = useRef([]);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { isLoading, error, verifyMail } = useAuthStore();
  const navigate = useNavigate();
  // for any changes in input el
  const handleChange = (index, value) => {
    const newCode = [...code];
    // when code pasted || entered
    if (value.length > 1) {
      // code is pasted
      const pastedCode = value.slice(0, 6).split("");
      // put the pasted Code into newCode
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }

      // set the code
      setCode(newCode);

      // once pasted code is set focus to inputbox to lastunfilled el if there is any
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      // once lastpastedinput index is got set the focus to next input box
      // if lastIndex is smaller than 5 then set to focus to next box by +1 else set to 5 which is last box
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      // code is entered  one by one
      newCode[index] = value;
      setCode(newCode);
      // move the focus to next input field if value is enetered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // for any keydown in input el
  const handleKeyDown = (index, e) => {
    // when backspace is entered && input is empty && input position is greater than 0
    // find the index 1 step less than current and focus on that
    if (e.key == "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificationCode = code.join("");
    await verifyMail(verificationCode);
    navigate("/");
    console.log("Code submitted successfully!", verificationCode);
  };

  // if all input field is occupied
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <motion.div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg p-8">
      {/* form to verify email */}
      <h1 className="mb-6 text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text">
        Verify Your Email
      </h1>
      <p className="mb-6 text-center text-gray-300">
        Enter the 6 digits code sent to your email address.
      </p>

      {/* // form for code input */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="6"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
            />
          ))}
        </div>
        {/* Error  */}
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

        {/* Verify button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmailVerification;
