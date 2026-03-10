import createPostTable from './post-tbody.template.js';
import PostService from '../../api/PostService.js';

import { goToPostDetail } from '../../utils/route.js';
import { getCategoryFromPath, errorBoundary } from '../../utils/common.js';

class PostTable extends HTMLElement {
  async connectedCallback() {
    try {
      const category = getCategoryFromPath();
      const { posts } = await PostService.getPosts(category);
      this.innerHTML = createPostTable(posts);

      const tbody = this.querySelector('tbody');
      tbody.querySelectorAll('tr').forEach(tr => {
        tr.addEventListener('click', () => {
          const id = tr.dataset.set;
          goToPostDetail(id);
        });
      });
    } catch {
      errorBoundary(this);
    }
  }
}

customElements.define('post-table', PostTable);
export default PostTable;
