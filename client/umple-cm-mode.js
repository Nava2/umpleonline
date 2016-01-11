/**
 * Created to handle highlighting umple code
 */

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }

  function def(mimes, mode) {
    if (typeof mimes == "string") mimes = [mimes];
    var words = [];
    function add(obj) {
      if (obj) for (var prop in obj) if (obj.hasOwnProperty(prop))
        words.push(prop);
    }
    add(mode.keywords);
    add(mode.types);
    add(mode.builtin);
    add(mode.atoms);
    if (words.length) {
      mode.helperType = mimes[0];
      CodeMirror.registerHelper("hintWords", mimes[0], words);
    }

    for (var i = 0; i < mimes.length; ++i)
      CodeMirror.defineMIME(mimes[i], mode);
  }

  def("text/x-umple", {
    name: "clike",
    keywords: words("abstract activate active after afterEvery as assert "+
      "association associationClass before " +
      "boolean break byte cardinality " +
      "case catch char class const constant continue deactivate debug " +
      "default defaulted depend " +
      "do double during else entry enum execute exit " +
      "extends external final finally float for generate " +
      "goto if immutable implements import " +
      "instanceof int interface internal isA key lazy long " +
      "namespace native new onThisObject package period position " +
      "private protected public " +
      "return self settable short singleton statemachine " +
      "static strictfp super switch synchronized "+
      "this throw throws trace tracecase tracer trait transient " +
      "try unique until use where void volatile while"),
    types: words("Boolean Double Float Integer String Date Time"),
    blockKeywords: words("catch class do else finally for if switch try while"),
    defKeywords: words("class interface package enum"),
    typeFirstDefinitions: true,
    atoms: words("true false null"),
    endStatement: /^[;:]$/,
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      }
    },
    modeProps: {fold: ["brace", "import"]}
  });

});
