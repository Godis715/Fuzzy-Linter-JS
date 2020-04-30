function y = lint(a1, a2, a3, a4)
    fis = getFISCodeGenerationData("readability.fis");
    y = evaluatefis(fis, [a1, a2, a3, a4]);
end