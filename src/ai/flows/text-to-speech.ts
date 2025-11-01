import { getAI } from "../genkit.js";

export async function textToSpeech(inputText) {
  if (!inputText) throw new Error("Kein Text übergeben");
  const ai = await getAI();
  const res = await ai.generate({
    model: "gpt-4o-mini",
    prompt: `Sprich den folgenden Text natürlich aus: ${inputText}`,
  });
  return res.outputText;
}
