const userController = require('../controller/user-controller');
const Router = require('express').Router
const {body} = require('express-validator');
const postController = require('../controller/post-controller');
const authMiddleWare = require('../middlewares/auth-middleware');

const router = new Router();

//Роуты для Постов
router.post('/post', authMiddleWare, postController.createPost // Контроллер для создания поста
);
router.get('/posts', authMiddleWare,
    postController.getAllPosts // Контроллер для получения всех постов
);

router.get('/posts/:postId',
    postController.getPostById // Контроллер для получения поста по ID
);

router.post('/posts/:postId/like',
    authMiddleWare, // Middleware для проверки аутентификации
    postController.likePost // Контроллер для постановки лайка посту
);

router.post('/posts/:postId/comment',
    authMiddleWare, // Middleware для проверки аутентификации
    body('text').notEmpty(),
    postController.addComment// Контроллер для добавления комментария к посту
);

router.delete('/posts/:postId',
    authMiddleWare, // Middleware для проверки аутентификации
    postController.deletePost // Контроллер для удаления поста
);

// Роуты для логина/Регистрации.
router.
    post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 12}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh)
router.
    get('/users',
    authMiddleWare,
    userController.getUsers
);


module.exports = router;