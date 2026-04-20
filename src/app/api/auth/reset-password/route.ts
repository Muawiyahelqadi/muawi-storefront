import bcrypt from "bcryptjs";
import { client } from "@/src/sanity/lib/client";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const doc = await client.fetch(
    `*[_type == "passwordResetToken" && token == $token][0]`,
    { token },
  );

  if (!doc || new Date(doc.expires) < new Date()) {
    return Response.json(
      { error: "Token expired or invalid." },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(password, 12);

  await client
    .patch({
      query: `*[_type == "user" && email == $email]`,
      params: { email: doc.email },
    })
    .set({ password: hashed })
    .commit();

  // Delete used token
  await client.delete(doc._id);

  return Response.json({ message: "Password updated." });
}
