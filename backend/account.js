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

module.exports = router;
