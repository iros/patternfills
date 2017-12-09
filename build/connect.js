module.exports = function(grunt) {

  grunt.config.set('connect', {
    options: {
      port: 8002,
      hostname: '*',
      keepalive: true

    },

    server: {
      options: {
        base: ['node_modules', 'public']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};