require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

async function seedUsers() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is missing.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB...");

    // remove any existing user data
    await User.deleteMany({});
    console.log("Old users removed");

    const users = [
      { name: "Admin", email: "admin@gmail.com", password: "admin#123", role: "admin" },
      { name: "Manager", email: "manager@gmail.com", password: "manager#123", role: "manager" },
      { name: "Employee", email: "employee@gmail.com", password: "employee#123", role: "employee" },
    ];

    // insert new users
    for (const newUser of users) {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      await User.create({
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        role: newUser.role,
      });
    }

    console.log("User seeding completed.");
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    process.exit(0);
  }
}

seedUsers();
