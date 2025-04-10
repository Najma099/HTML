const zod = require("zod");
const userSchema = zod.array(
  zod.object({
    name: zod.string().min(8).max(10),
    email: zod.string().email(),
    contactNumber: zod.number(),
    country: zod.union([zod.literal("China"), zod.literal("India")]),
  }),
);

const data = [
  {
    name: "shdfsfdbsd",
    email: "shoye@gmail.com",
    contactNumber: 9327156940,
    country: "India",
  },
  {
    name: "Najmaatun",
    email: "shoye@gmail.com",
    contactNumber: 9327156940,
    country: "China",
  },
];
try {
  const res = userSchema.safeParse(data);
  console.log(res);
  //console.log(res.error);
} catch (error) {
  console.error(error);
  // console.error(error.error);
}
