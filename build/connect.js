module.exports = function(grunt) {

  grunt.config.set('connect', {
    options: {
      port: 8000,
      hostname: '*'
    },

    server: {
      options: {
        base: ['node_modules', 'public']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};