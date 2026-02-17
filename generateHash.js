import bcrypt from "bcryptjs";

const run = async () => {
  const hash = await bcrypt.hash("12345", 10);
  console.log("Generated Hash:", hash);
};

run();
