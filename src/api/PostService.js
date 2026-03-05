import HttpClient from './HttpClient.js';

class PostService extends HttpClient {
  constructor() {
    super();
  }

  getPosts() {
    return super.get('/posts.json');
  }

  getPostDetail(id) {
    return super.get(`/post/${id}.json`);
  }
}

export default new PostService();
