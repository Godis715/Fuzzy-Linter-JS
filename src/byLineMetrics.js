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
            lineLength: line.length,
            tokensCount: tokensByLines[li].length,
        })
    );

    return byLineMetrics;
}