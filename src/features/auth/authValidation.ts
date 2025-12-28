export const usernameValidation = {
  required: "Username is required",
  minLength: { value: 3, message: "Username must be at least 3 characters" },
  maxLength: { value: 30, message: "Username cannot exceed 30 characters" },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: "Username can only contain letters, numbers, and underscores",
  },
};

export const companyNameValidation = {
  required: "Company name is required",
  minLength: { value: 3, message: "Company name must be at least 3 characters" },
  maxLength: { value: 30, message: "Company name cannot exceed 30 characters" },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: "Company name can only contain letters, numbers, and underscores",
  },
};

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "Invalid email format",
  },
};


export const passwordValidation = {
  required: "Password is required",
  minLength: { value: 6, message: "Password must be at least 6 characters" },
};

export const confirmPasswordValidation = (password: string) => ({
  required: "Confirm password is required",
  validate: (value: string) =>
    value === password || "Passwords do not match",
});
