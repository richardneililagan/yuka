//
// :: Routing configuration
//


import HttpError from './components/errors/httperrors';

export default (app) => {

  // :: routes go here
  //
  app.use('/api/tests', require('./api/test'));
  //
  // :: /routes

  // :: all undefined routes should 404
  app.route('/:url(api)/*').get(HttpError(404));
};