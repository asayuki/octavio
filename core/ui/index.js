'use strict';

exports.register = (plugin, options, next) => {

  plugin.route([
    {
      method: 'GET',
      path: '/',
      config: {
        handler: (request, response) => {
          console.log(request.auth);
          if (request.auth.isAuthenticated) {
            response.view('index');
          } else {
            response.redirect('/login');
          }
        },
        auth: {
          mode: 'try',
          strategies: ['session']
        },
        state: {
          parse: true, // parse and store in request.state
          failAction: 'ignore' // may also be 'ignore' or 'log'
        },
        plugins: {
          'hapi-auth-cookie': {redirectTo: false},
        }
      }
    },
    {
      method: 'GET',
      path: '/login',
      config: {
        handler: (request, response) => {
          if (!request.auth.isAuthenticated) {
            response.view('login');
          } else {
            response.redirect('/');
          }
        },
        auth: {
          mode: 'try',
          strategies: ['session']
        },
        state: {
          parse: true, // parse and store in request.state
          failAction: 'ignore' // may also be 'ignore' or 'log'
        },
        plugins: {
          'hapi-auth-cookie': {redirectTo: false},
        }
      }
    },
    {
      method: 'GET',
      path: '/statics/{path*}',
      config: {
        handler: {
          directory: {
            path: './core/ui/statics'
          }
        },
        state: {
          parse: true, // parse and store in request.state
          failAction: 'ignore' // may also be 'ignore' or 'log'
        },
        id: 'statics'
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  'name': 'ui',
  'version': '1.0.0',
  'description': 'ui plugin',
  'main': 'index.js',
  'author': 'neme <neme@whispered.se>',
  'license': 'MIT'
};
