const express = require('express');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const cardRoute = require('./card.route');
const noteRoute = require('./note.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/cards',
    route: cardRoute,
  },
  {
    path: '/notes',
    route: noteRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
