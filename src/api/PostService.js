import HttpClient from './HttpClient.js';

class PostService extends HttpClient {
  constructor() {
    super();
  }

  async getPosts(category) {
    const res = await super.get('/posts.json');
    // mock data를 활용하여 카테고리별로 포스트를 필터링
    if (category === 'latest') {
      return res;
    } else if (category) {
      return { posts: res.posts.filter(post => post.category === category) };
    } else {
      return res;
    }
  }

  getPostDetail(id) {
    return super.get(`/post/${id}.json`);
  }
}

export default new PostService();
