    include = function() {

  // save references to save a few bytes
    var args = arguments;
    var doc = document;

    var toLoad = args.length; // load this many scripts
  var lastArgument = args[toLoad - 1];
    var hasCallback = lastArgument.call; // is the last arg a callback?
    if (hasCallback) {
        toLoad --;
    }

    function onScriptLoaded() {
    var readyState = this.readyState; // we test for "complete" or "loaded" if on IE
    if (!readyState || /ded|te/.test(readyState)) {
      toLoad --;
      if (!toLoad && hasCallback) {
        lastArgument();
      }
    }
    }

    var script;
    for (var i = 0; i < toLoad; i ++) {

        script = doc.createElement('script');
        script.src = arguments[i];
    script.async = true;
        script.onload = script.onerror = script.onreadystatechange = onScriptLoaded;
        (
            doc.head ||
            doc.getElementsByTagName('head')[0]
        ).appendChild(script);

    }

    };


    include("https://cdn.jsdelivr.net/ace/1.1.3/noconflict/ace.js", function () {
      include("https://cdn.jsdelivr.net/ace/1.1.3/noconflict/mode-rust.js", function () {
        (function () {
  "use strict";
  // ECMAScript 6 Backwards compatability
  if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(str) {
      return this.slice(0, str.length) === str;
    };
  }

  // Regex for finding new lines
  var newLineRegex = /(?:\r\n|\r|\n)/g;

  // Fetching DOM items
  var activeCode = document.getElementById("active-code");
  var editorDiv = document.getElementById("editor");
  var staticCode = document.getElementById("static-code");
  var runButton = document.getElementById("run-code");
  var resultDiv = document.getElementById("result");
  var playLink = document.getElementById("playlink");

  // Background colors for program result on success/error
  var successColor = "#E2EEF6";
  var errorColor = "#F6E2E2";
  var warningColor = "#FFFBCB";

  // Error message to return when there's a server failure
  var errMsg = "The server encountered an error while running the program.";

  // Stores ACE editor markers (highights) for errors
  var markers = [];

  // Status codes, because there are no enums in Javascript
  var SUCCESS = 0;
  var ERROR = 1;
  var WARNING = 2;

  // JS exists, display ACE editor
  staticCode.style.display = "none";
  activeCode.style.display = "block";

  // Setting up ace editor
  var editor = ace.edit("editor");
  var Range = ace.require('ace/range').Range;
  editor.setTheme("ace/theme/chrome");
  editor.getSession().setMode("ace/mode/rust");
  editor.setShowPrintMargin(false);
  editor.renderer.setShowGutter(false);
  editor.setHighlightActiveLine(false);

  // Changes the height of the editor to match its contents
  function updateEditorHeight() {
    // http://stackoverflow.com/questions/11584061/
    var newHeight = editor.getSession().getScreenLength()
      * editor.renderer.lineHeight
      + editor.renderer.scrollBar.getWidth();

    editorDiv.style.height = Math.ceil(newHeight).toString() + "px";
    editor.resize();
  }

  // Set initial size to match initial content
  updateEditorHeight();

  // Safely remove all content from the result div
  function clearResultDiv() {
    // Clearing the result div will break our reference to
    // the playlink icon, so let's save it if it exists
    var newPlayLink = document.getElementById("playlink");
    if (newPlayLink) {
      playLink = resultDiv.removeChild(newPlayLink);
    }
    resultDiv.innerHTML = "";
  }

  function escapeHTML(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(newLineRegex, '<br />');
  }

  // Dispatches a XMLHttpRequest to the Rust playpen, running the program, and
  // issues a callback to `callback` with the result (or null on error)
  function runProgram(program, callback) {
    var req = new XMLHttpRequest();
    var data = JSON.stringify({
      version: "beta",
      optimize: "2",
      code: program
    });

    // console.log("Sending", data);
    req.open('POST', "https://play.rust-lang.org/evaluate.json", true);
    req.onload = function(e) {
      var statusCode = false;
      var result = null;

      if (req.readyState === 4 && req.status === 200) {
        result = JSON.parse(req.response);

        // handle application errors from playpen
        if (typeof result['error'] === 'string') {
          statusCode = ERROR;
          result = 'Playpen Error: ' + result['error'];
        } else if (typeof result['result'] === 'string') {
          statusCode = SUCCESS;
          result = result['result'];

          // handle rustc errors/warnings
          // Need server support to get an accurate version of this.
          if (result.indexOf("error:") !== -1) {
            statusCode = ERROR;
          } else if (result.indexOf("warning:") !== -1) {
            statusCode = WARNING;
          }
        }
      }

      callback(statusCode, result);
    };

    req.onerror = function(e) {
      callback(false, null);
    };

    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
  }

  // The callback to runProgram
  function handleResult(statusCode, message) {
    // Dispatch depending on result type
    if (result == null) {
      clearResultDiv();
      resultDiv.style.backgroundColor = errorColor;
      resultDiv.innerHTML = errMsg;
    } else if (statusCode === SUCCESS) {
      handleSuccess(message);
    } else if (statusCode === WARNING) {
      handleWarning(message);
    } else {
      handleError(message);
    }
  }

  // Called on successful program run: display output and playground icon
  function handleSuccess(message) {
    resultDiv.style.backgroundColor = successColor;
    displayOutput(escapeHTML(message), editor.getValue());
  }

  // Called when program run results in warning(s)
  function handleWarning(message) {
    resultDiv.style.backgroundColor = warningColor;
    handleProblem(message, "warning");
  }

  // Called when program run results in error(s)
  function handleError(message) {
    resultDiv.style.backgroundColor = errorColor;
    handleProblem(message, "error");
  }

  // Called on unsuccessful program run. Detects and prints problems (either
  // warnings or errors) in program output and highlights relevant lines and text
  // in the code.
  function handleProblem(message, problem) {
    // Getting list of ranges with problems
    var lines = message.split(newLineRegex);

    // Cleaning up the message: keeps only relevant problem output
    var cleanMessage = lines.map(function(line) {
      if (line.startsWith("<anon>") || line.indexOf("^") !== -1) {
        var errIndex = line.indexOf(problem + ": ");
        if (errIndex !== -1) {return line.slice(errIndex);}
        return "";
      }

      // Discard playpen messages, keep the rest
      if (line.startsWith("playpen:")) {return "";}
      return line;
    }).filter(function(line) {
      return line !== "";
    }).map(function(line) {
      return escapeHTML(line);
    }).join("<br />");

    // Setting message
    displayOutput(cleanMessage, editor.getValue());

    // Highlighting the lines
    var ranges = parseProblems(lines);
    markers = ranges.map(function(range) {
      return editor.getSession().addMarker(range, "ace-" + problem + "-line",
        "fullLine", false);
    });

    // Highlighting the specific text
    markers = markers.concat(ranges.map(function(range) {
      return editor.getSession().addMarker(range, "ace-" + problem + "-text",
        "text", false);
    }));
  }

  // Parses a problem message returning a list of ranges (row:col, row:col) where
  // problems in the code have occured.
  function parseProblems(lines) {
    var ranges = [];
    for (var i in lines) {
      var line = lines[i];
      if (line.startsWith("<anon>:") && line.indexOf(": ") !== -1) {
        var parts = line.split(/:\s?|\s+/, 5).slice(1, 5);
        var ip = parts.map(function(p) { return parseInt(p, 10) - 1; });
        // console.log("line:", line, parts, ip);
        ranges.push(new Range(ip[0], ip[1], ip[2], ip[3]));
      }
    }

    return ranges;
  }

  // Registering handler for run button click
  runButton.addEventListener("click", function(ev) {
    resultDiv.style.display = "block";
    clearResultDiv();
    resultDiv.innerHTML = "Running...";

    // clear previous markers, if any
    markers.map(function(id) { editor.getSession().removeMarker(id); });

    // Get the code, run the program
    var program = editor.getValue();
    runProgram(program, handleResult);
  });

  // Display an output message and a link to the Rust playground
  function displayOutput(message, program) {
    var programUrl = "https://play.rust-lang.org/?code=" +
        encodeURIComponent(program) + "&run=1";
    playLink.href = programUrl;

    clearResultDiv();                // clear resultDiv, then add
    resultDiv.appendChild(playLink); // playLink icon and message
    resultDiv.innerHTML += message;
  }

  // Highlight active line when focused
  editor.on('focus', function() {
    editor.setHighlightActiveLine(true);
  });

  // Don't when not
  editor.on('blur', function() {
    editor.setHighlightActiveLine(false);
  });
 }());

      });
    });

    function detect_platform() {
  "use strict";
  var os = "unknown";

  if (os == "unknown") {
    if (navigator.platform == "Linux x86_64") {os = "x86_64-unknown-linux-gnu";}
    if (navigator.platform == "Linux i686") {os = "i686-unknown-linux-gnu";}
  }

  // I wish I knew by know, but I don't. Try harder.
  if (os == "unknown") {
    if (navigator.appVersion.indexOf("Win")!=-1) {os = "x86_64-pc-windows-gnu";}
    if (navigator.appVersion.indexOf("Mac")!=-1) {os = "x86_64-apple-darwin";}
    if (navigator.appVersion.indexOf("Linux")!=-1) {os = "x86_64-unknown-linux-gnu";}
  }

  return os;
 }

 (function () {
  "use strict";
  var platform = detect_platform();

  var rec_package_name = "1.1.0";
  var rec_version_type = "source";
  var rec_download_file = "rustc-1.1.0-src.tar.gz";

  if (platform == "x86_64-unknown-linux-gnu") {
    rec_version_type = "Linux binary";
    rec_download_file = "rust-" + rec_package_name + "-x86_64-unknown-linux-gnu.tar.gz";
  } else if (platform == "i686-unknown-linux-gnu") {
    rec_version_type = "Linux binary";
    rec_download_file = "rust-" + rec_package_name + "-i686-unknown-linux-gnu.tar.gz";
  } else if (platform == "x86_64-apple-darwin") {
    rec_version_type = "Mac installer";
    rec_download_file = "rust-" + rec_package_name + "-x86_64-apple-darwin.pkg";
  } else if (platform == "x86_64-pc-windows-gnu") {
    rec_version_type = "Windows installer";
    rec_download_file = "rust-" + rec_package_name + "-x86_64-pc-windows-gnu.msi";
  }

  var rec_package_desc = rec_package_name + " (<span>" + rec_version_type + "</span>)";
  var rec_vers_div = document.getElementById("install-version");
  rec_vers_div.innerHTML = rec_package_desc;

  var rec_dl_addy = "https://static.rust-lang.org/dist/" + rec_download_file;
  var rec_inst_link = document.getElementById("inst-link");
  rec_inst_link.setAttribute("href", rec_dl_addy);
 }());
