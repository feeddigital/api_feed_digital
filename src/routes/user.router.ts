import { Router } from "express";
import * as controller from '../controllers/user.controllers';
import passport from "passport";
import { checkAuth } from "../middlewares/jwt";
// import { validateGetNews, validatePostNews } from "../middlewares/validators/news.validator";

const router = Router();

router.get('/', controller.getAll);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/private', checkAuth, (req, res)=>res.json({ user: req.user }));
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), controller.googleResponse);

export default router;