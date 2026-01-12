import { client } from "@/src/sanity/lib/client";

export async function getUserByEmail(email: string) {
  const query = `*[_type == "user" && email == $email][0]`;
  return await client.fetch(query, { email });
}
