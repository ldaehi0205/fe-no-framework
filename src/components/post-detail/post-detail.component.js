import createPostDetail from './post-detail.template.js';
import PostService from '../../api/PostService.js';

class PostDetail extends HTMLElement {
  async connectedCallback() {
    const endpoint = window.location.pathname.split('/').pop();

    const post = await PostService.getPostDetail(endpoint);
    this.innerHTML = createPostDetail(post);
  }
}

customElements.define('post-detail', PostDetail);

export default PostDetail;
