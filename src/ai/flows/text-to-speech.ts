import { ai } from "../genkit";

export async function textToSpeech(inputText: string): Promise<string> {
  if (!inputText) throw new Error("Kein Text übergeben");

  const response = await ai.generate({
    model: "gpt-4o-mini",
    prompt: `Sprich den folgenden Text natürlich aus: ${inputText}`,
  });

  return response.outputText;
}
