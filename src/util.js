var _ = require("underscore");
var fs = require("fs");

module.exports = {
  templifyPath: function (url) {
    return _.template(fs.readFileSync(url,{ encoding: "utf-8" }));
  },

  writeOutFile: function (path, contents) {
    fs.writeFileSync("./public/" + path, contents, {encoding: "utf-8"});
  }
};