const userModel = require("../models/user-model");
const PostService = require("../service/PostService");
const tokenService = require("../service/tokenService");
const userService = require("../service/userService");

class PostController {
    async createPost(req, res, next) {
        try {
            const { title, content } = req.body;

            const postData = await PostService.createPost(title, content, authorId);
            return res.json(postData)
        } catch (e) {
            console.log('хз откуда ошибка')
            next(e)
        }
    }

    async likePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;

            const post = await PostService.likePost(postId, userId);
            return res.json(post)
        } catch (e) {
            next(e)
        }
    }

    async getAllPosts(req, res, next) {
        try {
            const posts = await PostService.getAllPosts();
            return res.json(posts)
        } catch (e) {
            next(e)
        }
    }
    
    async getPostById(req, res, next) {
        try {
            const postId = req.params.postId;
            const post = await PostService.getPostById(postId);
            return res.json(post)
        } catch (e) {
            next(e)
        }
    }
    
    
    async addComment(req, res, next) {
        try {
            const postId = req.params.postId;
            const { text } = req.body;
            const userId = req.user.id;

            const post = await PostService.addComment(postId, text, userId);
            return res.json(post)
        } catch (e) {
            next(e)
        }
    }

    async deletePost(req, res, next) {
        try {
            const postId = req.params.postId;

            const deletedPost = await PostService.deletePost(postId);
            return res.json(deletedPost);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController();