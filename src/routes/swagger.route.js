import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('../../swagger.json');

const router = Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;
