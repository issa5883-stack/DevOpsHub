const express = require("express");
const redis = require("redis");

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Connect to Redis
const client = redis.createClient({
    url: "redis://redis:6379"
});

client.on("error", (err) => {
    console.error("Redis Client Error", err);
});

// Escape HTML for security
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Start Server
async function startServer() {
    await client.connect();

    console.log("Connected to Redis");

    // Home Page
    app.get("/", async (req, res) => {
        try {
            // Increment visit counter in Redis
            await client.incr("visits");

            res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>DevOpsHub - Message Collector</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background: #f1f5f9;
            color: #1f2937;
        }

        header {
            background: #0f766e;
            color: #fff;
            padding: 20px 16px;
            text-align: center;
        }

        header h1 {
            margin: 0;
            font-size: 1.7rem;
        }

        header p {
            margin: 6px 0 0;
            opacity: .85;
        }

        main {
            max-width: 760px;
            margin: 28px auto;
            padding: 0 16px;
        }

        h2 {
            margin: 32px 0 12px;
            font-size: 1.15rem;
        }

        .form-card {
            background: #fff;
            border-radius: 10px;
            padding: 24px;
            box-shadow: 0 2px 10px rgba(0,0,0,.08);
        }

        textarea {
            width: 100%;
            min-height: 130px;
            padding: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-family: inherit;
            font-size: 1rem;
            resize: vertical;
            outline: none;
        }

        textarea:focus {
            border-color: #0f766e;
        }

        button {
            margin-top: 16px;
            padding: 11px 20px;
            background: #0f766e;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
        }

        button:hover {
            background: #115e59;
        }

        .dashboard {
            display: inline-block;
            margin-top: 22px;
            padding: 10px 18px;
            background: #0f766e;
            color: #fff;
            border-radius: 6px;
            text-decoration: none;
        }

        .dashboard:hover {
            background: #115e59;
        }

        footer {
            text-align: center;
            color: #64748b;
            font-size: .8rem;
            margin: 24px 0;
        }
    </style>
</head>

<body>

    <header>
        <h1>DevOpsHub</h1>
        <p>App 1 &middot; Message Collector &middot; Submit your messages</p>
    </header>

    <main>

        <h2>Submit a Message</h2>

        <section class="form-card">

            <form action="/submit" method="POST">

                <textarea
                    name="message"
                    placeholder="Write your message..."
                    required></textarea>

                <button type="submit">
                    Submit Message
                </button>

            </form>

        </section>

        <div style="text-align:center">
            <a class="dashboard" href="http://localhost:3001">
                View Dashboard
            </a>
        </div>

    </main>

    <footer>
        Cloud Computing &amp; DevOps Midterm &middot; Shared Redis database
    </footer>

</body>
</html>
            `);

        } catch (err) {
            res.status(500).send("Error: " + escapeHtml(err.message));
        }
    });

    // Submit Message
    app.post("/submit", async (req, res) => {
        try {
            const message = req.body.message;

            if (!message || !message.trim()) {
                return res.status(400).send("Message cannot be empty");
            }

            // Store message in Redis List
            await client.rPush("messages", message.trim());

            res.redirect("/");

        } catch (err) {
            res.status(500).send("Error: " + escapeHtml(err.message));
        }
    });

    app.listen(port, "0.0.0.0", () => {
        console.log(`App 1 listening on port ${port}`);
    });
}

startServer();