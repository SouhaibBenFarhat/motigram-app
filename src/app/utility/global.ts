
export class Globals {


    TOKEN_KEY = "TOKEN";
    CURRENT_USER = "CURRENT_USER";
    IS_LOGGED_IN = "IS_LOGGED_IN";
    DUMMY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvbmFsZG8iLCJwYXNzd29yZCI6IiQyYSQxMCRnVE80UjdBUy5GMEZIT1UybjQ4N0p1RGpTMUFGWktLQ3MwTXd2S3Y2czhCYndGeDFFQ2N3TyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTE5MTAxMTM2fQ.5neXTLteFpMHnc2A0rWr0VkXdHCL2B5W-t3-cxeyHBw"
    DEFAUL_IMAGE_PLACEHOLDER = "http://localhost:5000/api/upload/image-placeholder.png";


    urls = {} as IDictionary;
    private serverAddress: string = "http://localhost:5000";


    constructor() {



        //Internal
        //Auth
        this.urls['login'] = this.serverAddress + '/api/auth/login';
        this.urls['register'] = this.serverAddress + '/api/auth/register';
        this.urls['info'] = this.serverAddress + '/api/auth/info';


        //Data Secure
        //Posts
        this.urls['post'] = this.serverAddress + '/api/v1/post';
        this.urls['latest-posts'] = this.serverAddress + '/api/v1/post/latest';
        this.urls['post-user-comments'] = this.serverAddress + '/api/v1/post/user/';
        this.urls['post-by-username'] = this.serverAddress + '/api/v1/post/';
        this.urls['upload'] = this.serverAddress + '/api/v1/upload/';
        this.urls['popular-post'] = this.serverAddress + '/api/v1/post/popular/';
        this.urls['like-post'] = this.serverAddress + '/api/v1/post/like/';
        this.urls['dislike-post'] = this.serverAddress + '/api/v1/post/dislike/';






        //Comments
        this.urls['comment'] = this.serverAddress + '/api/v1/comment';
        this.urls['latest-comment'] = this.serverAddress + '/api/v1/comment/latest';
        this.urls['comment-by-user'] = this.serverAddress + '/api/v1/comment/user/';



        //Users
        this.urls['user-by-id'] = this.serverAddress + '/api/v1/user/';





    }


    singleQuaryParamBuilder(attribute: string, data: string) {
        return '?' + attribute + '=' + data;
    }
    multipleQueryParamsBuilder(attributes: Array<string>, data: Array<string>) {
        //TODO LATER
    }



}

interface IDictionary {
    [index: string]: string;
}