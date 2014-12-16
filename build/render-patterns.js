module.exports = function(grunt) {

  grunt.registerTask('render', 'builds the sample files', function() {

    var done = this.async();

    var child = grunt.util.spawn({
      cmd: process.argv[0], // <- A better way to find the node binary
      args: ['src/render.js']
    }, function() {
      done();
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

};