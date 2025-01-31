import { db } from "@/lib/db";
import bcrypt from "bcrypt";

async function createUser(name, email, password) {
  "use server";

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

export async function register(formData) {
  "use server";
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
export { createUser };

//ajouter JWT pour la connexion
//ajouter bcrypt pour crypter le mot de passe
