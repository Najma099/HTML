import bcrypt from "bcrypt";

export async function isPasswordCorrect(userpassword, dbpassword){
  try{
    return await bcrypt.compare(userpassword, dbpassword);
  }
  catch(err) {
    console.log("Error while comparing Passwords", err);
    return null;
  }
}