// validators/authValidator.js
const { z } = require("zod");

const createAccountSchema = z.object({
  username: z.string().min(1, "username required"),
  email: z
    .string()
    .email("Invalid email format")
    .regex(/@gmail.com$/, { message: "Email must end with '@...com'" }),
  password: z.string().min(1, "password required"),
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .regex(/@gmail.com$$/, { message: "Email must end with '@...com'" }),
  password: z.string().min(1, "password required"),
});

module.exports = { createAccountSchema, loginSchema };
