module.exports = function(grunt) {

  grunt.config.set('copy', {
    examples: {
      files: [
        { expand: true, src: ['examples/**'], dest: 'public/'}
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};