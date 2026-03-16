import createPostDetail from './post-detail.template.js';
import PostService from '../../api/PostService.js';

import { errorBoundary, createEscapeText } from '../../utils/common.js';

class PostDetail extends HTMLElement {
  async connectedCallback() {
    try {
      const endpoint = window.location.pathname.split('/').pop();

      const post = await PostService.getPostDetail(endpoint);
      this.innerHTML = createEscapeText(createPostDetail)(post);
      const comment = this.querySelector('post-comment');
      comment.commentList = post.comment_list;
    } catch (e) {
      console.error(e);
      errorBoundary(this);
    }
  }
}

customElements.define('post-detail', PostDetail);

export default PostDetail;
