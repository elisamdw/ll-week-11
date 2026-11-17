import os from "node:os";

export const dynamic = "force-dynamic";

// GET /api/proto/host  the laptop's addresses on the local network, so a page can show phones where to join.
export async function GET() {
  const addresses = Object.values(os.networkInterfaces())
    .flat()
    .filter((a) => a && a.family === "IPv4" && !a.internal)
    .map((a) => a.address);
  return Response.json({ addresses, hostname: os.hostname() });
}
