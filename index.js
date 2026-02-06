const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Server nap tien dang hoat dong");
});
app.post("/api/nap", (req, res) => {
  const { minecraft, amount } = req.body;

  if (!minecraft || !amount) {
    return res.json({ message: "Thiếu thông tin" });
  }

  const data = {
    id: Date.now(),
    minecraft,
    amount,
    status: "pending",
    time: new Date().toISOString()
  };

  fs.appendFileSync("nap.json", JSON.stringify(data) + "\n");

  res.json({ message: "Đã gửi yêu cầu, chờ duyệt" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Web chạy tại port", PORT);
});
