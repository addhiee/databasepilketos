export default async function handler(req, res) {
  // ✅ Izinkan semua origin (agar bisa diakses dari tespilketosv2.vercel.app)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ result: "error", message: "Method not allowed" });
  }

  try {
    // Kirim ke Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbyHweSaxCJoWmO4Gd23cvMRVfdK2X_sX9du0Mgu3NVA7SRI91sMvlaUNwNsT18pbX8/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // Ambil raw text dari GAS
    const raw = await response.text();
    console.log("Raw response dari GAS:", raw);

    // Coba parse JSON-nya
    try {
      const parsed = JSON.parse(raw);
      return res.status(200).json(parsed);
    } catch (err) {
      console.warn("Gagal parse JSON, kirim raw text");
      return res.status(200).send(raw);
    }
  } catch (err) {
    console.error("Proxy Error:", err);
    return res.status(500).json({ result: "error", message: "Proxy gagal: " + err.message });
  }
}




