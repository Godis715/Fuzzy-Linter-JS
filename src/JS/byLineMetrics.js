import esprima from "esprima";

export default function getByLineMetrics(source) {
    const tokenizerConfig = {
        loc: true,
        comment: true
    };
    const tokens = esprima.tokenize(source, tokenizerConfig);
    const tokensByLines = tokens.reduce(
        (result, token) => {
            result[token.loc.start.line - 1].push(token);
            return result;
        },
        tokens.map(
            () => []
        )
    );
    const lines = source.split(/\r?\n/);

    const byLineMetrics = lines.map(
        (line, li) => ({
            lineLength: line.trim().length,
            tokensCount: tokensByLines[li].length,
            maxBraceNesting: maxBraceNesting(tokensByLines[li])
        })
    );

    return byLineMetrics;
}

function maxBraceNesting(tokens) {
    let nestingLevel = 0;
    let max = 0;
    let min = tokens.length; 

    tokens.forEach(
        (t) => {
            if (t.type !== "Punctuator") {
                return;
            }

            if (t.value === "(" || t.value === "[" || t.value === "{") {
                ++nestingLevel;
            }
            else if (t.value === ")" || t.value === "]" || t.value === "}") {
                --nestingLevel;
            }

            if(nestingLevel > max) {
                max = nestingLevel;
            }
            else if (nestingLevel < min) {
                min = nestingLevel;
            }
        }
    );

    return Math.max(max, Math.abs(min));
}