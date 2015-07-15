//
// :: HTTP response errors
//

export default function HttpError (statuscode) {
  return function (req, res) {

    const result = {
      status : statuscode
    };

    res.status(result.status);

    // :: try to render a specific error page for this error.
    //    if none is found, return a standard JSON response.
    res.render(result.status, (err) => {
      if (err) {
        return res.json(result, result.status);
      }

      res.render(result.status);
    });
  };
};