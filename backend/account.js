const express = require("express");
const db = require("./database");

const router = express.Router();

// Get all accounts
router.get("/", (req, res) => {
  db.all(
    `SELECT id, user_id, account_number, balance, currency, status, created_at
     FROM accounts`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve accounts"
        });
      }

      res.json(rows);
    }
  );
});

// Get one account
router.get("/:id", (req, res) => {
  db.get(
    `SELECT id, user_id, account_number, balance, currency, status, created_at
     FROM accounts
     WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve account"
        });
      }

      if (!row) {
        return res.status(404).json({
          error: "Account not found"
        });
      }

      res.json(row);
    }
  );
});

// Create account
router.post("/", (req, res) => {
  const { user_id, currency } = req.body;

  if (!user_id) {
    return res.status(400).json({
      error: "user_id is required"
    });
  }

  const accountNumber =
    "TRX" + Date.now().toString().slice(-10);

  db.run(
    `INSERT INTO accounts
     (user_id, account_number, balance, currency, status)
     VALUES (?, ?, 0, ?, 'active')`,
    [user_id, accountNumber, currency || "KES"],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to create account"
        });
      }

      res.status(201).json({
        id: this.lastID,
        user_id,
        account_number: accountNumber,
        balance: 0,
        currency: currency || "KES",
        status: "active"
      });
    }
  );
});

module.exports = router;
