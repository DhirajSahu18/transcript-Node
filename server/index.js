import express from "express";
import cors from "cors";
import { YoutubeTranscript } from "youtube-transcript";
import { translate } from "free-translate";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());


app.post("/url", async (req, res) => {
    const { url } = req.body;
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);

        // Assuming the transcript is in an array format
        const transcriptText = transcript.map(item => item.text).join("\n");

        // Save the transcript to a text file
        fs.writeFileSync("transcript.txt", transcriptText);

        // Send the download link in the response
        res.status(200).json({
            transcript,
            downloadLink: `${req.protocol}://${req.get("host")}/download/transcript`
        });
    } catch (error) {
        console.log("Error fetching or translating transcript:", error?.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Endpoint to handle file download
app.get("/download/transcript", (req, res) => {
    const filePath = path.join(__dirname, "transcript.txt");
    res.download(filePath);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
