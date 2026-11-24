import * as fs from "node:fs";
import * as path from "node:path";

const SENTENCE =
  "We rent out professional grandmothers to scold your employees, because a disappointed sigh from a 78-year-old cuts deeper than any HR warning, and startups pay $200 an hour for the guilt trip.";

// Validate the entry before writing: the bounty requires exactly one
// sentence of 1-200 characters. Fail loudly instead of writing bad output.
if (!SENTENCE.trim()) {
  console.error("error: entry sentence is blank");
  process.exit(1);
}
if (SENTENCE.length < 1 || SENTENCE.length > 200) {
  console.error(
    `error: entry sentence must be 1-200 characters, got ${SENTENCE.length}`,
  );
  process.exit(1);
}
const terminators = SENTENCE.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !SENTENCE.endsWith(terminators[0])) {
  console.error("error: entry must be exactly one sentence");
  process.exit(1);
}

// An empty or whitespace-only MAKEFUN_OUTPUT_DIR is as useless as an unset
// one; fall back to /output instead of letting mkdirSync throw on "".
const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawOutDir && rawOutDir.trim() ? rawOutDir : "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), SENTENCE, "utf8");
