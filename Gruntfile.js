/* global module,process */
module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    meta: {
      pkg: grunt.file.readJSON("package.json")
    }
  });

  // Load Grunt plugins.
  grunt.loadTasks('build');


  grunt.registerTask("dev", ["watch"]);
  grunt.registerTask("default", ["render", "copy"]);
};