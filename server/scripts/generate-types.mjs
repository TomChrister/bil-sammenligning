import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";

const host = process.env.AUTOSYS_HOST;
const apiKey = process.env.AUTOSYS_API_KEY;

if (!host || !apiKey) {
  console.error("AUTOSYS_HOST og AUTOSYS_API_KEY må være satt (se server/.env).");
  process.exit(1);
}

const specUrl = `${host}/v3/api-docs`;

const res = await fetch(specUrl, {
  headers: { "SVV-Authorization": `Apikey ${apiKey}` },
});

if (!res.ok) {
  console.error(`Klarte ikke hente OpenAPI-spec fra ${specUrl}: HTTP ${res.status}`);
  process.exit(1);
}

const spec = await res.json();
const ast = await openapiTS(spec);
const output = astToString(ast);

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "autosys");
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, "types.generated.ts");

const header = `/**\n * Auto-generert fra ${specUrl}.\n * Ikke rediger manuelt — kjør \`npm run generate:types\` på nytt for å oppdatere.\n */\n`;

await fs.writeFile(outPath, header + output);
console.log(`Skrev typer til ${outPath}`);
