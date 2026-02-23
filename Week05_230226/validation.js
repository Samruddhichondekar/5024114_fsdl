function validatePassword(password) {
    if (password.length < 6) {
        return "Password too short";
    }
    return "Strong password";
}

console.log(validatePassword("123"));
console.log(validatePassword("secure123"));