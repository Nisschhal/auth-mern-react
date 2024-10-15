import { Check, X } from "lucide-react";

// PASSWORD CRITERIA
const PassowrdCriteria = ({ password }) => {
  // Give the list of requirements for password
  const criteria = [
    {
      label: "At least 6 characters",
      met: password.length >= 6,
    },
    {
      label: "Containts UPPERCASE",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Contains lowercase",
      met: /[a-z]/.test(password),
    },
    {
      label: "Contains a number",
      met: /\d/.test(password),
    },
    {
      label: "Contains special charcters",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {/* Based on the criteria met, gives the list of label and its success icon */}
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
/***
 * GET THE PASSWORD
 * CREATE STRENGTH BASED ON THAT PASSWORD
 * CREATE SETRENGTHTEXT BASED ON THE BUIT STRENGTH
 * CREATE PROGRESS BAR COLOR BASED ON THE BUILT STRENGTH
 */
const PasswordMeter = ({ password }) => {
  // pass the password and set the strength number

  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  // get the strength number
  const strength = getStrength(password);

  // pass the strength number and set the strength text;
  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  // get the progress meter color based on the passed strenth
  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="mt-2">
      {/* // PasswordStrength----------weak/strong/good/verygood */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-400">PasswordStrength</span>
        <span className="text-sm text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>
      {/* // progress meter - - - - */}
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      {/* INSERT THE CRIETERIA LIST */}
      <PassowrdCriteria password={password} />
    </div>
  );
};

// CALL THE PASSWORMETER WHICH HAS ALL THE PARTS: Progress strength, name, and bar, and password criteria
const PasswordStrengthMeter = ({ password }) => {
  return (
    <div className="mb-6">
      <PasswordMeter password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
