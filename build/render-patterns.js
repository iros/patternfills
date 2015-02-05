module.exports = function(grunt) {

  grunt.registerTask('render', 'builds the sample files', function() {

    var done = this.async();

    var backgroundColor = grunt.option('background');
    var foregroundColor = grunt.option('foreground');

    var child = grunt.util.spawn({
      cmd: process.argv[0], // <- A better way to find the node binary
      args: ['src/render.js', backgroundColor, foregroundColor]
    }, function() {
      done();
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

};