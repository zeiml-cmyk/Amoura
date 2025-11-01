// server.js
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Health / Root
app.get("/health", (_req, res) => res.status(200).send("ok"));
app.get("/", (_req, res) =>
  res.send("✅ Amoura Backend läuft erfolgreich auf Firebase App Hosting.")
);

// Chat-Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    if (!OPENAI_API_KEY) {
      return res
        .status(500)
        .json({ error: "OPENAI_API_KEY nicht gesetzt (Secret fehlt)." });
    }

    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Parameter 'message' fehlt." });
    }

    const body = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      temperature: 0.2,
      max_tokens: 400
    };

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30_000)
    });

    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      return res
        .status(502)
        .json({ error: "OpenAI-Fehler", status: resp.status, detail: txt });
    }

    const data = await resp.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim?.() ??
      "(keine Antwort erhalten)";

    return res.json({ reply });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Serverfehler", detail: String(err?.message || err) });
  }
});

// Start
app.listen(port, () => {
  console.log(`🚀 Amoura Backend läuft auf Port ${port}`);
});
