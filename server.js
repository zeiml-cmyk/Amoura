const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Basisroute
app.get("/", (req, res) => {
  res.send("✅ Amoura Backend läuft erfolgreich auf Firebase Hosting!");
});

// Beispiel-API-Route
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Fehlende Eingabe" });

  // Platzhalter-Antwort, bis OpenAI-Integration aktiv ist
  res.json({ reply: `Deine Nachricht war: ${message}` });
});

// Serverstart
app.listen(port, () => {
  console.log(`🚀 Server läuft auf Port ${port}`);
});
