import bcrypt from "bcrypt";

// สร้างฟังก์ชัน async เพื่อให้เราใช้ await ได้
const createHash = async () => {
  try {
    const password = "123456";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

// เรียกใช้ฟังก์ชัน
createHash();