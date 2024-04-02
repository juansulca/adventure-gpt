import { chat } from "@/lib/chat";

export async function POST(request: Request, { params }: { params: { id: string }}) {
  const { id } = params;
  const body = await request.json();

  const ans = await chat(body.choice, id);
  return Response.json(ans);
}
