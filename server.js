const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    app: "T3allem",
    version: "V5.0"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`T3allem server listening on port ${PORT}`);
});
