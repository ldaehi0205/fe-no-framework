import createPostDetail from './post-detail.template.js';
import PostService from '../../api/PostService.js';

import { errorBoundary, createEscapeHtml } from '../../utils/common.js';

class PostDetail extends HTMLElement {
  async connectedCallback() {
    try {
      const endpoint = window.location.pathname.split('/').pop();

      const post = await PostService.getPostDetail(endpoint);
      this.innerHTML = createEscapeHtml(createPostDetail)(post);
    } catch {
      errorBoundary(this);
    }
  }
}

customElements.define('post-detail', PostDetail);

export default PostDetail;
