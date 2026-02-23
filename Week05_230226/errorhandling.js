function checkAge(age) {
    if (age < 18) {
        throw new Error("You must be 18 or above");
    }
    return "Access granted";
}

try {
    console.log(checkAge(19));
} catch (error) {
    console.log(error.message);
}