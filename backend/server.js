const express = require("express");
const cors = require("cors");

const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test backend
app.get("/", (req, res) => {
    res.json({
        message: "TradX Backend is running"
    });
});

// Test database
app.get("/api/status", (req, res) => {
    db.get("SELECT 1 AS connected", (err, row) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                database: "disconnected"
            });
        }

        res.json({
            status: "online",
            service: "TradX Backend",
            database: "connected"
        });
    });
});

// Get users
app.get("/api/users", (req, res) => {
    db.all(
        "SELECT id, name, email, created_at FROM users",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: "Failed to retrieve users"
                });
            }

            res.json(rows);
        }
    );
});

// Get accounts
app.get("/api/accounts", (req, res) => {
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

app.listen(PORT, () => {
    console.log(`TradX Backend running on port ${PORT}`);
});
