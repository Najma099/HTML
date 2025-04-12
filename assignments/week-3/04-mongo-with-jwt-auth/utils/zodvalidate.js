const zod = require("zod");

const Schemaobj = zod.object({
  username: zod.string().min(6, "Username must be at least 6 characters").max(10),
  password: zod.string().min(6, "Password must be at least 6 characters")
});

module.exports = {
  userSchema
};
