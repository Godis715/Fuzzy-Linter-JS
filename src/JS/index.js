import byLineMetrics from "./byLineMetrics.js";
import fs from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

const sourcePath = process.argv[2];
const source = fs.readFileSync(sourcePath, "utf8");

const metrics = byLineMetrics(source);

const lines = source.split(/\r?\n/);

metrics.forEach(
    (m, i) => {
        const buffer = execSync(
            `${resolve("./src/fis/lint.exe")} ${m.lineLength} ${m.tokensCount}`,
            "utf8"
        );
        const result = parseFloat(buffer.toString("utf-8")) / 0.9;
        const green = (result >= 0.5) ? 255 : (255 * 2 * result);
        const red = (result <= 0.5) ? 255 : (255 * (2 - 2 * result));
        const color = `rgb(${red}, ${green}, 0)`;
        const html = `<div style="white-space: pre; font-family: monospace"><span style="background-color: ${color}; white-space: pre; margin-right: 8px">  </span>${lines[i]}</div>`;
        console.log(html);
    }
)