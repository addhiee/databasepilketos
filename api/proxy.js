export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
  
    const response = await fetch("https://script.google.com/macros/s/AKfycbwqV7l5iEq9snJzwpSpatjlQVcSyZcFHsgQsdPvW56w6dED4lTO354v1iHeIUljR1o/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
  
    const result = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(result);
  }
  
