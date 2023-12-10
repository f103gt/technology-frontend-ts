export const validateName = (initials) => {
    const startsWithUppercase = /^[A-Z][a-z]*$/.test(initials);
    const containsNoNumbers = !/\d/.test(initials);
    return !startsWithUppercase && !containsNoNumbers ?
        "Initials must start with an uppercase letter and contain no numbers."
        : "";
};

export const validateEmail = (email) => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailFormat.test(email)) {
        return "Invalid email format. Please provide a valid email address.";
    } else {
        return "";
    }
};

export const validatePassword = (password) => {
    const minLength = 8;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    const isLengthValid = password.length >= minLength;
    const isUppercaseValid = hasUppercase;
    const isLowercaseValid = hasLowercase;
    const isDigitValid = hasDigit;
    const isSpecialCharValid = hasSpecialChar;

    return {
        valid: isLengthValid && isUppercaseValid && isLowercaseValid && isDigitValid && isSpecialCharValid,
        errors: {
            length: !isLengthValid ? `Password must be at least ${minLength} characters long` : '',
            uppercase: !isUppercaseValid ? 'Password must contain at least one uppercase letter' : '',
            lowercase: !isLowercaseValid ? 'Password must contain at least one lowercase letter' : '',
            digit: !isDigitValid ? 'Password must contain at least one digit' : '',
            specialChar: !isSpecialCharValid ? 'Password must contain at least one special character' : '',
        }
    };
};
