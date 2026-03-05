import createPostTable from './post-tbody.template.js';
import PostService from '../../api/PostService.js';
import { navigate } from '../../utils/route.js';

class PostTable extends HTMLElement {
  async connectedCallback() {
    const { posts } = await PostService.getPosts();
    this.innerHTML = createPostTable(posts);

    const tbody = this.querySelector('tbody');
    tbody.querySelectorAll('tr').forEach(tr => {
      tr.addEventListener('click', () => {
        const id = tr.dataset.set;
        navigate(`/post/${id}`);
      });
    });
  }
}

customElements.define('post-table', PostTable);
export default PostTable;
