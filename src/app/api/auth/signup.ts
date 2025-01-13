import { supabase } from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

// Using the same validation function as in login
const validateInput = (email: string, password: string) => {
  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return { error: "Invalid email format" };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }
  return { error: null };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  // Validate input
  const { error: inputError } = validateInput(email, password);
  if (inputError) {
    return res.status(400).json({ error: inputError });
  }

  // Sign up the user
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: "Signed up successfully", user: data.user });
}
