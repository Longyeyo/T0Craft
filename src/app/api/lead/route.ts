export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        name?: string;
        contact?: string;
        budget?: string;
        detail?: string;
        source?: string;
      }
    | null;

  if (!body?.contact) {
    return Response.json({ ok: false, error: "缺少联系方式" }, { status: 400 });
  }

  const payload = {
    ts: Date.now(),
    name: body.name ?? "",
    contact: body.contact ?? "",
    budget: body.budget ?? "",
    detail: body.detail ?? "",
    source: body.source ?? "web",
  };

  const webhook = process.env.FEISHU_WEBHOOK_URL || process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);
  }

  return Response.json({ ok: true });
}

