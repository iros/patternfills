var _ = require("underscore");
var fs = require("fs");
var path = require("path");

module.exports = {
  templifyPath: function (url) {
    return _.template(
      fs.readFileSync(
        path.join(__dirname, "templates", url),
        { encoding: "utf-8" }
      )
    );
  },

  writeOutFile: function (url, contents) {
    fs.writeFileSync(
      path.join(__dirname, "../public", url), contents, {encoding: "utf-8"});
  }
};