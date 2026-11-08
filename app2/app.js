// Web App 2 - Dashboard (Observer)
// Reads the shared Redis database on every page load and shows:
//   - total number of messages  -> LLEN messages
//   - total visits to App 1     -> GET visits
//   - the 5 latest messages      -> LRANGE messages -5 -1
// This app only READS from Redis; App 1 is the only writer.

const express = require("express");
const redis = require("redis");

const app = express();
const port = 3000;

// "redis" is the service name in docker-compose.yml (resolved by Docker DNS)
const client = redis.createClient({
    url: process.env.REDIS_URL || "redis://redis:6379"
});

client.on("error", (err) => {
    console.error("Redis Client Error", err);
});

// Messages are user input, so escape them before putting them in HTML
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderPage(totalMessages, totalVisits, latest) {
    const rows = latest.length
        ? latest.map((msg, i) => `<li><span>#${totalMessages - i}</span>${escapeHtml(msg)}</li>`).join("")
        : `<li class="empty">No messages yet. Submit one from App 1.</li>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOpsHub - Dashboard</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: #f1f5f9; color: #1f2937; }
        header { background: #0f766e; color: #fff; padding: 20px 16px; text-align: center; }
        header h1 { margin: 0; font-size: 1.7rem; }
        header p { margin: 6px 0 0; opacity: .85; }
        main { max-width: 760px; margin: 28px auto; padding: 0 16px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .stat { background: #fff; border-radius: 10px; padding: 24px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,.08); }
        .num { font-size: 3rem; font-weight: 700; color: #0f766e; }
        .label { color: #475569; margin-top: 4px; }
        h2 { margin: 32px 0 12px; font-size: 1.15rem; }
        ul { list-style: none; margin: 0; padding: 0; background: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,.08); }
        li { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; word-break: break-word; }
        li:last-child { border-bottom: 0; }
        li span { color: #0f766e; font-weight: 600; margin-right: 10px; }
        li.empty { color: #64748b; text-align: center; }
        .refresh { display: inline-block; margin-top: 22px; padding: 10px 18px; background: #0f766e; color: #fff; border-radius: 6px; text-decoration: none; }
        footer { text-align: center; color: #64748b; font-size: .8rem; margin: 24px 0; }
    </style>
</head>
<body>
    <header>
        <h1>DevOpsHub Dashboard</h1>
        <p>App 2 &middot; Observer &middot; data is read from Redis on every page load</p>
    </header>
    <main>
        <section class="stats">
            <div class="stat">
                <div class="num">${totalMessages}</div>
                <div class="label">Total Messages</div>
            </div>
            <div class="stat">
                <div class="num">${totalVisits}</div>
                <div class="label">Total Visits (App 1)</div>
            </div>
        </section>

        <h2>Latest Messages</h2>
        <ul>${rows}</ul>

        <div style="text-align:center"><a class="refresh" href="/">Refresh</a></div>
    </main>
    <footer>Cloud Computing &amp; DevOps Midterm &middot; Shared Redis database</footer>
</body>
</html>`;
}

async function startServer() {
    await client.connect();
    console.log("Connected to Redis");

    app.get("/", async (req, res) => {
        try {
            // Fresh data on every request
            const totalMessages = await client.lLen("messages");
            const totalVisits = parseInt(await client.get("visits"), 10) || 0;
            const latest = (await client.lRange("messages", -5, -1)).reverse(); // newest first

            res.send(renderPage(totalMessages, totalVisits, latest));
        } catch (err) {
            res.status(500).send("Error: " + escapeHtml(err.message));
        }
    });

    app.get("/health", async (req, res) => {
        try {
            await client.ping();
            res.json({ status: "ok" });
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
    });

    app.listen(port, "0.0.0.0", () => {
        console.log(`App 2 (Dashboard) listening on port ${port}`);
    });
}

startServer();
