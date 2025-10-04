export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwqV7l5iEq9snJzwpSpatjlQVcSyZcFHsgQsdPvW56w6dED4lTO354v1iHeIUljR1o/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (err) {
    console.error("Proxy error:", err);   // <-- ini penting
    return res.status(500).json({ result: "error", message: err.message });
  }
}
