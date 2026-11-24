import * as fs from "node:fs";
import * as path from "node:path";

const SENTENCE =
  "We rent out professional grandmothers to scold your employees, because a disappointed sigh from a 78-year-old cuts deeper than any HR warning, and startups pay $200 an hour for the guilt trip.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), SENTENCE, "utf8");
