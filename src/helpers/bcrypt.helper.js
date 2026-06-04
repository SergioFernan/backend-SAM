import { compareSync, genSaltSync, hashSync } from "bcrypt";

const encryptPassword = (originalPassword) => {
  try {
    const salt = genSaltSync(4);
    const hashPassword = hashSync(originalPassword, salt);
    return hashPassword;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const validatepassword = (originalPassword, hashPassword) => {
  try {
    const isValid = compareSync(originalPassword, hashPassword);
    return isValid;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { encryptPassword, validatepassword };