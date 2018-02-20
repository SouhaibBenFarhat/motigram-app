export class Post {
    id: string;
    likes: number;
    dislike: number;
    interactions: Array<Interaction>;
    description: string;
    thumbnail: string;
    owner: Owner;
    createdAt: number;

    constructor() { this.owner = new Owner(); this.interactions = new Array<Interaction>() }

}


export class Interaction {
    userId: string;
    type: string;
}

export class Owner {
    userId: string;
    username: string;
    profilePicture: string;
}