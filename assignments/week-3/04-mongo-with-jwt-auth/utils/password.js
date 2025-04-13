import bcrypt from "bcrypt";

export async function isPasswordCorrect(userPassword, hashedPassword) {
  try {
    return await bcrypt.compare(userPassword, hashedPassword);
  } catch (err) {
    console.error("Error while comparing passwords:", err);
    return null;
  }
}