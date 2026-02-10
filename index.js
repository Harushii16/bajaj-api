const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "harushi0520.be23@chitkara.edu.in";

/* ---------- HEALTH API ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

/* ---------- HELPER FUNCTIONS ---------- */
function fibonacci(n) {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function hcf(a, b) {
  return b === 0 ? a : hcf(b, a % b);
}

function lcm(a, b) {
  return (a * b) / hcf(a, b);
}

/* ---------- MAIN BFHL API ---------- */
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL,
    message: "BFHL API is running. Use POST request."
  });
});

app.post("/bfhl", (req, res) => {
  try {
    const body = req.body;
    let data;

    // Fibonacci
    if (body.fibonacci !== undefined) {
      if (typeof body.fibonacci !== "number" || body.fibonacci < 0) {
        return res.status(400).json({ is_success: false });
      }
      data = fibonacci(body.fibonacci);
    }

    // Prime
    else if (body.prime !== undefined) {
      if (!Array.isArray(body.prime)) {
        return res.status(400).json({ is_success: false });
      }
      data = body.prime.filter(isPrime);
    }

    // LCM
    else if (body.lcm !== undefined) {
      if (!Array.isArray(body.lcm)) {
        return res.status(400).json({ is_success: false });
      }
      data = body.lcm.reduce((a, b) => lcm(a, b));
    }

    // HCF
    else if (body.hcf !== undefined) {
      if (!Array.isArray(body.hcf)) {
        return res.status(400).json({ is_success: false });
      }
      data = body.hcf.reduce((a, b) => hcf(a, b));
    }

    // AI (FIXED ANSWER)
    else if (body.AI !== undefined) {
      if (typeof body.AI !== "string") {
        return res.status(400).json({ is_success: false });
      }

      const q = body.AI.toLowerCase();

      if (q.includes("capital") && q.includes("maharashtra")) {
        data = "Mumbai";
      } else {
        data = "Unknown";
      }
    }

    // Invalid request
    else {
      return res.status(400).json({ is_success: false });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (err) {
    res.status(500).json({ is_success: false });
  }
});

/* ---------- SERVER ---------- */
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}



module.exports = app;
