/**
 * Created by kevin on 05/01/16.
 */

/// <reference path='../typings/tsd.d.ts' />

$(() => {

  CodeMirror.fromTextArea(<HTMLTextAreaElement>($("#code-editor").get(0)), {
    lineNumbers: true,
    mode: "text/x-umple"
  });

});

