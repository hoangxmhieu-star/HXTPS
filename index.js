const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ===== GIAO DIỆN WEB =====
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nạp tiền server</title>
  <style>
    body {
      background: #111;
      color: #fff;
      font-family: Arial;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .box {
      background: #1e1e1e;
      padding: 20px;
      width: 300px;
      border-radius: 8px;
    }
    input, button {
      width: 100%;
      margin-top: 10px;
      padding: 8px;
    }
    button {
      background: #4caf50;
      border: none;
      color: white;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="box">
    <h3>Nạp tiền Minecraft</h3>
    <input id="name" placeholder="Tên Minecraft">
    <input id="amount" type="number" placeholder="Số tiền (VND)">
    <button onclick="nap()">Gửi yêu cầu</button>
    <p id="msg"></p>
  </div>

  <script>
    function nap() {
      fetch("/api/nap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minecraft: document.getElementById("name").value,
          amount: document.getElementById("amount").value
        })
      })
      .then(r => r.json())
      .then(d => {
        document.getElementById("msg").innerText = d.message;
      });
    }
  </script>
</body>
</html>
  `);
});

// ===== API NẠP TIỀN =====
app.post("/api/nap", (req, res) => {
  const { minecraft, amount } = req.body;

  if (!minecraft || !amount) {
    return res.json({ message: "Thiếu thông tin!" });
  }

  console.log("Yêu cầu nạp:", minecraft, amount);

  res.json({
    message: "Đã gửi yêu cầu, chờ admin duyệt"
  });
});

app.listen(PORT, () => {
  console.log("Server chạy port " + PORT);
});
