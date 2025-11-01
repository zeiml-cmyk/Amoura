import { genkit } from "@genkit-ai/core";
import { genkitxOpenai } from "@genkit-ai/openai";

export const ai = genkit({
  plugins: [
    genkitxOpenai({
      apiKey: process.env.OPENAI_API_KEY || "",
      model: "gpt-4o-mini",
    }),
  ],
});
