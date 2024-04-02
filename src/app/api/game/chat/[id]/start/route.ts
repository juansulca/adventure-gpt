import { startChat } from "@/lib/chat";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { start } = await request.json();
  const ans = await startChat(start, id);
  return Response.json(ans);
}
