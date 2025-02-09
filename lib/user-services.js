"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/sessions";

async function createUser(name, email, password) {
  const hashedPassword = await hashPassword(password);

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error(" ⚠️ Email already exists");
  }

  try {
    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw new Error("Erreur dans la fonction createUser");
  }

  console.log("user created");
}

async function register(formData) {
  const password = formData.get("password");

  if (formData.get("password") !== formData.get("Cpassword")) {
    throw new Error("⚠️ Les mots de passe ne correspondent pas");
  }

  if (password.length < 8) {
    throw new Error("⚠️ Votre mot de passe doit faire au moins 8 caractères");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error(
      "⚠️ Votre mot de passe doit contenir au moins une majuscule",
    );
  }
  if (!/[a-z]/.test(password)) {
    throw new Error(
      "⚠️ Votre mot de passe doit contenir au moins une minuscule",
    );
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("⚠️ Votre mot de passe doit contenir au moins un chiffre");
  }

  try {
    await createUser(
      formData.get("name"),
      formData.get("email"),
      formData.get("password"),
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
  try {
    await login(formData);
  } catch (e) {
    console.error("Erreur lors de la connexion de l'utilisateur :", e);
    throw e;
  }
}

async function checkUser(email, password) {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("⚠️ Email not found");
  }

  const isPasswordCorrect = await checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("⚠️ Password incorrect");
  }

  await createSession(user.id);
  return user;
}

async function login(formData) {
  const email = formData.get("email");
  const pwd = formData.get("password");

  try {
    await checkUser(email, pwd);
    console.log("user found");
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur :", error);
    throw error;
  }
  redirect("/");
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
}

async function checkPassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword); // true or false
  } catch (err) {
    console.error("Erreur lors de la vérification du mot de passe:", err);
    throw err;
  }
}

async function logout() {
  await deleteSession();
  redirect("/login", "push");
}
export { createUser, register, login, logout };
