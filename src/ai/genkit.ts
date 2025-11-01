import { genkit } from "@genkit-ai/core";
import { openai as genkitOpenAI } from "@genkit-ai/openai";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const sm = new SecretManagerServiceClient();
async function getOpenAIKey() {
  // Projekt-NUMMER einsetzen (nicht die Projekt-ID).
  const name = "projects/1082143561359/secrets/OPENAI_API_KEY/versions/latest";
  const [version] = await sm.accessSecretVersion({ name });
  return version.payload.data.toString("utf8");
}

let _ai;
export async function getAI() {
  if (_ai) return _ai;
  const apiKey = process.env.OPENAI_API_KEY || await getOpenAIKey();
  _ai = genkit({
    plugins: [genkitOpenAI({ apiKey })],
  });
  return _ai;
}
