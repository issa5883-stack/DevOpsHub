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

// Connect to Redis
async function startServer() {
    await client.connect();

    console.log("Connected to Redis");

    app.get("/", async (req, res) => {
        try {
            // Increment visit counter
            const visits = await client.incr("visits");

            res.send(`
                <h1>DevOpsHub</h1>
                <h2>Message Collector</h2>

                <p>Number of Visits: ${visits}</p>

                <form action="/submit" method="POST">
                    <textarea
                        name="message"
                        placeholder="Write your message..."
                        required>
                    </textarea>

                    <br><br>

                    <button type="submit">Submit Message</button>
                </form>
            `);

        } catch (err) {
            res.status(500).send("Error: " + err.message);
        }
    });

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
            res.status(500).send("Error: " + err.message);
        }
    });

    app.listen(port, "0.0.0.0", () => {
        console.log(`App 1 listening on port ${port}`);
    });
}

startServer();