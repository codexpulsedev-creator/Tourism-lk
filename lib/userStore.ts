import connectDB from "./db";
import User from "@/models/User";
import { hashPassword, comparePassword } from "./auth";

export interface StoredUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  country?: string;
  createdAt: Date;
}

declare global {
  // eslint-disable-next-line no-var
  var inMemoryUsers: StoredUser[] | undefined;
}

// Pre-populate in-memory store for fallback/offline mode
if (!global.inMemoryUsers) {
  global.inMemoryUsers = [
    {
      _id: "demo-user-1",
      name: "Admin LankaExplore",
      email: "admin@lankaexplore.com",
      password: "$2a$10$wE0vP7kQhZf7/e5XvO2PbeYtKj4Vw20f4f9Q5nQ47x7FpWkXk6/aO", // hashed "password123"
      role: "admin",
      country: "Sri Lanka",
      createdAt: new Date(),
    },
    {
      _id: "demo-user-2",
      name: "Traveler Explorer",
      email: "traveler@lankaexplore.com",
      password: "$2a$10$wE0vP7kQhZf7/e5XvO2PbeYtKj4Vw20f4f9Q5nQ47x7FpWkXk6/aO", // hashed "password123"
      role: "user",
      country: "United Kingdom",
      createdAt: new Date(),
    },
  ];
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const db = await connectDB();
    if (db) {
      const user = await User.findOne({ email: normalizedEmail }).lean();
      if (user) {
        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          password: user.password || "",
          role: user.role as "user" | "admin",
          country: user.country,
          createdAt: user.createdAt,
        };
      }
    }
  } catch (err) {
    console.warn("MongoDB findUserByEmail fallback to memory store:", err);
  }

  const inMemory = global.inMemoryUsers?.find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );
  return inMemory || null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  try {
    const db = await connectDB();
    if (db) {
      const user = await User.findById(id).lean();
      if (user) {
        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          password: user.password || "",
          role: user.role as "user" | "admin",
          country: user.country,
          createdAt: user.createdAt,
        };
      }
    }
  } catch (err) {
    console.warn("MongoDB findUserById fallback to memory store:", err);
  }

  const inMemory = global.inMemoryUsers?.find((u) => u._id === id);
  return inMemory || null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  country?: string;
  role?: "user" | "admin";
}): Promise<StoredUser> {
  const normalizedEmail = data.email.toLowerCase().trim();
  const hashedPassword = await hashPassword(data.password);
  const role = data.role || (normalizedEmail.includes("admin") ? "admin" : "user");

  try {
    const db = await connectDB();
    if (db) {
      const newUser = await User.create({
        name: data.name,
        email: normalizedEmail,
        password: hashedPassword,
        country: data.country || "",
        role,
      });

      const userObj: StoredUser = {
        _id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        password: newUser.password || "",
        role: newUser.role as "user" | "admin",
        country: newUser.country,
        createdAt: newUser.createdAt,
      };

      // Also mirror to in-memory store
      global.inMemoryUsers = global.inMemoryUsers || [];
      global.inMemoryUsers.push(userObj);

      return userObj;
    }
  } catch (err) {
    console.warn("MongoDB createUser fallback to in-memory store:", err);
  }

  const inMemoryUser: StoredUser = {
    _id: "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    name: data.name,
    email: normalizedEmail,
    password: hashedPassword,
    country: data.country || "",
    role,
    createdAt: new Date(),
  };

  global.inMemoryUsers = global.inMemoryUsers || [];
  global.inMemoryUsers.push(inMemoryUser);

  return inMemoryUser;
}
