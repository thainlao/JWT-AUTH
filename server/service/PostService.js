const ApiError = require('../exeptions/api-error');
const postsModel = require('../models/posts-model');
const PostDto = require('../dtos/postDTO');
const jwt = require('jsonwebtoken');

class PostService {
    async createPost(title, content, authorId) {
        try {
            const post = await postsModel.create({
                title,
                content,
                likes: [],
                comments: [],
                deleted: false,
                author: authorId,
            });

            const postDto = new PostDto(post);
            return { post: postDto}
        } catch (error) {
            throw new Error(error.message, 'здесь ошибка')
        }
    }

    async likePost(postId, userId) {
        try {
            const post = await postsModel.findById(postId);
            if (!post) {
                throw new Error('Пост не найден');
            }

            if (!post.likes.includes(userId)) {
                post.likes.push(userId);
                await post.save();
            }

            return post;
        } catch (error) {
            throw ApiError.UnauthorizedError(error);
        }
    }

    async deletePost(postId) {
        try {
            const post = await postsModel.findById(postId);
            if (!post) {
                throw new Error('Пост не найден');
            }

            post.deleted = true;
            await post.save();

            return post;
        } catch (error) {
            throw ApiError.UnauthorizedError(error);
        }
    }
    
    async getAllPosts() {
        try {
            const posts = await postsModel.find({ deleted: false });
            return posts;
        } catch (error) {
            throw ApiError.UnauthorizedError(error);
        }
    }

    async addComment(postId, text, authorId) {
        try {
            const post = await postsModel.findById(postId);
            if (!post) {
                throw new Error('Пост не найден');
            }

            const comment = {
                text,
                author: authorId,
            };

            post.comments.push(comment);
            await post.save();

            return post;
        } catch (error) {
            throw ApiError.UnauthorizedError(error);
        }
    }

    async getPostById(postId) {
        try {
            const post = await postsModel.findById(postId);
            if (!post || post.deleted) {
                throw new Error('Пост не найден');
            }

            return post;
        } catch (error) {
            throw ApiError.UnauthorizedError(error);
        }
    }
}

module.exports = new PostService();