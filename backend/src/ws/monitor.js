import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

let monitorProcess = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, "../test.sh");

export default function setupMonitorWS(wss) {
    wss.on("connection", (ws) => {
        console.log("WebSocket client connected");

        ws.on("message", (msg) => {
            const message = msg.toString();

            if (message === "START") {
                if (monitorProcess) {
                    ws.send("Monitoring already running");
                    return;
                }

                monitorProcess = spawn("bash", [scriptPath]);

                monitorProcess.stdout.on("data", (data) => {
                    ws.send(data.toString().trim());
                });

                monitorProcess.stderr.on("data", (data) => {
                    ws.send("ERROR: " + data.toString());
                });

                monitorProcess.on("close", (code) => {
                    ws.send(`Monitoring stopped (code ${code})`);
                    monitorProcess = null;
                });

                ws.send("Monitoring started");
            }

            if (message === "STOP") {
                if (!monitorProcess) {
                    ws.send("Monitoring not running");
                    return;
                }

                monitorProcess.kill("SIGTERM");
                monitorProcess = null;
                ws.send("Monitoring stopped");
            }
        });

        ws.on("close", () => {
            console.log("WebSocket client disconnected");
        });
    });
}
