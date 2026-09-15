import { WhopClient } from "@whop/sdk";

export function whopConfigured(): boolean {
  return Boolean(process.env.WHOP_API_KEY);
}

export function getWhopClient(): WhopClient {
  const token = process.env.WHOP_API_KEY;
  if (!token) throw new Error("WHOP_API_KEY is not set.");
  return new WhopClient({ token });
}
