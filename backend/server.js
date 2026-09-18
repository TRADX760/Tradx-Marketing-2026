const express = require("express");
const cors = require("cors");

const db = require("./database");
const accountsRouter = require("./accounts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Accounts API
app.use("/api/accounts", accountsRouter);

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

app.listen(PORT, () => {
    console.log(`TradX Backend running on port ${PORT}`);
});
