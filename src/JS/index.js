import byLineMetrics from "./byLineMetrics.js";
import escapeHtml from "./escapeHtml.js";
import generateStatusColor from "./generateStatusColor.js";
import { execSync } from "child_process";
import { resolve } from "path";
import fs from "fs";

const sourcePath = process.argv[2];

const source = fs.readFileSync(sourcePath, "utf8");
const template = fs.readFileSync(
    resolve("src/template/template.html"),
    "utf8"
);

const lines = source.split(/\r?\n/);

const metrics = byLineMetrics(source);

const bestResult = execLinter(0, 0, 0);
// exec linter on the worst case
const worstResult = execLinter(200, 30, 10);
const htmlLines = [];

metrics.forEach(
    (m, i) => {
        const result = execLinter(m.lineLength, m.tokensCount, m.maxBraceNesting);

        const normResult = normalize(result, worstResult, bestResult);
        const color = generateStatusColor(normResult);

        const coloredStatus = `<span class="status-block" style="background-color: ${color}"> </span>`;
        const htmlLine = `<div class="code">${coloredStatus}${escapeHtml(lines[i])}</div>`;
        htmlLines.push(htmlLine);
    }
);

const codeHtml = htmlLines.join("\n");
const htmlResult = template
    .replace("{code}", codeHtml)
    .replace("{stylePath}", resolve("src/CSS/stylesheet.css"));

console.log(htmlResult);

function execLinter(a1, a2, a3) {
    // cut values to max value
    a1 = a1 > 200 ? 200 : a1;
    a2 = a2 > 30 ? 30 : a2;
    a3 = a3 > 7 ? 7 : a3;
    
    const buffer = execSync(
        `${resolve("./src/MatLab/lint.exe")} ${a1} ${a2} ${a3} 0`,
        "utf8"
    );
    const result = parseFloat(buffer.toString("utf-8"));
    return result;
}

function normalize(value, min, max) {
    return (value - min) / (max - min);
}