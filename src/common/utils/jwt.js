import jwt from "jsonwebtoken";

export default {
  sign: (data) => jwt.sign(data, "KEY1"),
  verify: (token) => jwt.verify(token, "KEY1"),
};
