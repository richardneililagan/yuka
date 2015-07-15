import express from 'express';

import * as v1Controller from './test.controller.v1';

let router = express.Router();

router.get('/v1', v1Controller.index);

export default router;