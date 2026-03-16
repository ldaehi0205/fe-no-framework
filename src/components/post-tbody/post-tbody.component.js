import { createPostTable, createPostRows } from './post-tbody.template.js';
import PostService from '../../api/PostService.js';

import { goToPostDetail } from '../../utils/route.js';
import {
  getCategoryFromPath,
  errorBoundary,
  createEscapeText,
} from '../../utils/common.js';

class PostTable extends HTMLElement {
  #offsetPostID = 0;
  #offset = 20;

  #observer = null;

  #observe = () => {
    const el = this.querySelector(`#row-${this.#offsetPostID}`);
    if (el) this.#observer.observe(el);
  };

  #unobserve = () => {
    const el = this.querySelector(`#row-${this.#offsetPostID}`);
    if (el) this.#observer.unobserve(el);
  };

  #fetchError = () => {
    this.querySelector('tbody').appendChild(`<tr>
          <td colspan="5" class="content-error">
            데이터를 불러오지 못했습니다.
            <button class="retry-btn">다시 불러오기</button>
          </td>
        </tr>`);

    this.querySelector('.retry-btn').addEventListener(
      'click',
      () => {
        this.#fetchAndRenderRows();
      },
      { once: true },
    );
  };

  #fetchAndRenderRows = async () => {
    try {
      const category = getCategoryFromPath();
      const id = this.#offsetPostID;
      const offset = this.#offset;
      const isInitialFetch = id === 0;

      this.#unobserve();

      const { posts } = await PostService.getPosts({ category, id, offset });
      if (posts.length === 0) {
        if (isInitialFetch) {
          this.querySelector('tbody').innerHTML =
            `<tr><td colspan="5" 아직 작성된 게시글이 없습니다.</td></tr>`;
        }
        return;
      }
      this.querySelector('tbody').insertAdjacentHTML(
        'beforeend',
        createEscapeText(createPostRows)(posts),
      );

      this.#offsetPostID = posts.at(-1).id;
      this.#observe();
    } catch (e) {
      console.error(e);
      this.#fetchError();
    }
  };

  #bindRowClickEvents = () => {
    const tbody = this.querySelector('tbody');
    tbody.addEventListener('click', e => {
      const tr = e.target.closest('tr');
      const id = tr.dataset.id;
      goToPostDetail(id);
    });
  };

  async connectedCallback() {
    try {
      this.innerHTML = createPostTable();

      this.#observer = new IntersectionObserver(
        async (entries, observer) => {
          if (entries[0].isIntersecting)
            await this.#fetchAndRenderRows(observer);
        },
        { threshold: 1.0 },
      );

      await this.#fetchAndRenderRows(this.#observer);

      this.#bindRowClickEvents();
    } catch (e) {
      console.error(e);
      errorBoundary(this);
    }
  }

  disconnectedCallback() {
    this.#observer.disconnect();
    this.#observer = null;
  }
}

customElements.define('post-table', PostTable);
export default PostTable;
