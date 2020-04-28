function y = lint(a1, a2)
    fis = getFISCodeGenerationData("readability.fis");
    y = evaluatefis(fis, [a1, a2]);
end