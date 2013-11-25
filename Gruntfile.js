/* global module,process */
module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    meta: {
      pkg: grunt.file.readJSON("package.json")
    },

    watch: {
      options: {
        livereload: 35729
      },
      patterns: {
        files: ["./src/**/*"],
        tasks: ["render"]
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: "./build",
          livereload: 35729,
          keepalive:true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.registerTask("render", "builds the sample files", function() {

    var done = this.async();

    var child = grunt.util.spawn({
      cmd: process.argv[0], // <- A better way to find the node binary
      args: ["render.js"]
    }, function() {
      done();
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

  grunt.registerTask("default", ["render"]);
};