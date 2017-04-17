// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("codemirror-5.25.0/lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["codemirror-5.25.0/lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {
    "use strict";

    var WORD = /[а-яА-Я]+/;
    var KEYWORDS = ["клетка", "левая", "правая", "нет", "стена", "цвет"];

    CodeMirror.registerHelper("hint", "anyword", function (editor, options) {
        var word = options && options.word || WORD;
        var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
        var end = cur.ch, start = end;
        while (start && word.test(curLine.charAt(start - 1))) --start;

        var prefix = curLine.substring(start, end);
        var list = [];
        for (var i = 0; i < KEYWORDS.length; i++) {
            if (KEYWORDS[i].indexOf(prefix) == 0) {
                list.push(KEYWORDS[i]);
            }
        }

        return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
    });
});
