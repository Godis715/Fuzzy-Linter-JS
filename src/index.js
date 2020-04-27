import byLineMetrics from "./byLineMetrics.js";
import fs from "fs";

const sourcePath = process.argv[2];
const source = fs.readFileSync(sourcePath, "utf8");

console.log(
    JSON.stringify(byLineMetrics(source), null, "    ")
);