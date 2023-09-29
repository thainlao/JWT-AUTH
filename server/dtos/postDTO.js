module.exports = class PostDto {
    title;
    content;
    author;
    likes;
    comments;
    delated;
    id

    constructor(model) {
        this.title = model.title;
        this.content = model.content;
        this.id = model._id;
        this.comments = model.comments;
        this.likes = model.likes;
        this.delated = model.delated;
        this.author = model.author;
    }
}