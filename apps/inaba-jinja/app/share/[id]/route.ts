import { getFortune } from "#/lib/contentful";
import type { FortuneEntry } from "#/lib/contentful";

// export const runtime = 'edge'

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> => {
  const { id } = await params;
  let fortune: FortuneEntry;

  try {
    fortune = await getFortune(id);
  } catch {
    return new Response("not found", {
      status: 404,
    });
  }

  return Response.redirect(new URL(`/kuji/${fortune.sys.id}`, request.url));
};
