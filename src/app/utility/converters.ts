import { Post, Interaction } from "../models/post";
import { Comment } from "../models/comment";

export class Converters {



    public postConverter(data): Post {


        let post = new Post();
        post.id = data._id;
        post.description = data.description;
        post.dislike = data.dislike;
        post.likes = data.likes;
        post.thumbnail = data.thumbnail;
        post.createdAt = data.createdAt;
        if (data.owner != null && data.owner != undefined) {
            post.owner.profilePicture = data.owner.profilePicture;
            post.owner.userId = data.owner.userId;
            post.owner.username = data.owner.username;
        }
        if (data.interactions != null && data.interactions != undefined && data.interactions.length > 0) {
            for (let i = 0; i < data.interactions.length; i++) {
                let interaction = new Interaction();
                interaction.type = data.interactions[i].type;
                interaction.userId = data.interactions[i].userId;
                post.interactions.push(interaction);
            }
        }
        return post;

    }

    public commentConverter(data): any {
        let comment = new Comment();
        comment.id = data._id;
        comment.content = data.content;
        comment.postId = data.postId;
        comment.userId = data.userId;
        comment.createdAt = data.createdAt;
        return comment;
    }
}