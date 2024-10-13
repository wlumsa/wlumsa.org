import { supabase } from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export const authMiddleware = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const { data: user, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  (req as any).user = user;
  return handler(req, res);
};
