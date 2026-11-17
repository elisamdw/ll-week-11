import { validate } from "../../../../../lib/game-engine.mjs";
import { readRuleset, rulesetName, writeRuleset } from "../../../../../lib/game.mjs";

export const dynamic = "force-dynamic";

// GET  /api/game/rules/<name>  a ruleset
// PUT  /api/game/rules/<name>  save a remix (JSON body) to _content/game/_rulesets/<name>.json; presets can't be overwritten
// The app runs on the laptop, so this writes into the repo; commit the file to keep a remix.

export async function GET(_request, { params }) {
  const name = rulesetName((await params).name);
  const rules = name && (await readRuleset(name));
  if (!rules) return Response.json({ error: "no such ruleset" }, { status: 404 });
  return Response.json(rules);
}

export async function PUT(request, { params }) {
  const name = rulesetName((await params).name);
  if (!name) return Response.json({ error: "Names use lowercase letters, digits, and hyphens." }, { status: 400 });
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "body must be JSON" }, { status: 400 });
  }
  const errors = validate(body);
  if (errors.length) return Response.json({ error: "The rules don't check out yet.", errors }, { status: 400 });
  const result = await writeRuleset(name, body);
  return Response.json(result, { status: result.error ? 409 : 200 });
}
