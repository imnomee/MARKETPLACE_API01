import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
};

export const comparePassword = async (userPass, dbPass) => {
    const correctPassword = await bcrypt.compare(userPass, dbPass);
    return correctPassword;
};
