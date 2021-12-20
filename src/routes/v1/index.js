const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const cardRoute = require('./card.route');
const noteRoute = require('./note.route');
const eventRoute = require('./event.route');
const columnRoute = require('./column.route');
const boardRoute = require('./board.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/columns',
    route: columnRoute,
  },
  {
    path: '/boards',
    route: boardRoute,
  },
  {
    path: '/cards',
    route: cardRoute,
  },
  {
    path: '/notes',
    route: noteRoute,
  },
  {
    path: '/events',
    route: eventRoute,
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
