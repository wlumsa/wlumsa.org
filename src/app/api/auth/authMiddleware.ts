import { supabase } from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export const authMiddleware = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    // Verify the token and get the user
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Attach user to the request object for downstream use
    (req as any).user = user;

    // Call the next handler
    return handler(req, res);
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
