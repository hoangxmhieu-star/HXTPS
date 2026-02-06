const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server nap tien dang hoat dong");
});

app.post("/nap", (req, res) => {
  const { minecraft, sotien } = req.body;

  console.log("Nguoi nap:", minecraft, "So tien:", sotien);

  res.send("Da gui yeu cau nap tien cho " + minecraft);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server chay port " + PORT);
});
