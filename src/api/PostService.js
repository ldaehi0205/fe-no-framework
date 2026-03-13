import HttpClient from './HttpClient.js';
import { equalNumbers } from '../utils/common.js';

class PostService extends HttpClient {
  constructor() {
    super();
  }

  async getPosts({ category, offset, id }) {
    const res = await super.get('/posts.json');

    // 카테고리 필터링
    let posts = category
      ? res.posts.filter(post => post.category === category)
      : res.posts;

    // 내림차순 정렬
    posts = [...posts].sort((a, b) => b.id - a.id);

    // id 기준 시작점 탐색
    if (id > 0) {
      const startIndex = posts.findIndex(post => post.id === id);
      posts = startIndex !== -1 ? posts.slice(startIndex + 1) : [];
    }

    // offset 적용
    if (offset !== undefined) {
      posts = posts.slice(0, offset);
    }

    return { posts };
  }

  async getPostDetail(id) {
    const res = await super.get(`/posts.json`);
    const post = res.posts.find(post => equalNumbers(post.id, id));
    return post;
  }
}

export default new PostService();
