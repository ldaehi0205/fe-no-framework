import { createPostTable, createPostRows } from './post-tbody.template.js';
import PostService from '../../api/PostService.js';

import { goToPostDetail } from '../../utils/route.js';
import {
  getCategoryFromPath,
  errorBoundary,
  createEscapeText,
} from '../../utils/common.js';
import eventBus from '../../utils/eventBus.js';
import { getSignal } from '../../utils/abortController.js';

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
    this.querySelector('tbody').insertAdjacentHTML(
      'beforeend',
      `<tr>
          <td colspan="5" class="content-error">
            데이터를 불러오지 못했습니다.
            <button class="retry-btn">다시 불러오기</button>
          </td>
        </tr>`,
    );

    this.querySelector('.retry-btn').addEventListener(
      'click',
      () => {
        this.#fetchAndRenderRows();
      },
      { once: true },
    );
  };

  #setTbodyContent = string => {
    this.querySelector('tbody').innerHTML = string;
  };

  #renderSearchResults = (posts, { title }) => {
    if (title?.length > 0) {
      if (posts.length === 0) {
        this.#setTbodyContent(
          `<tr><td colspan="5">검색된 게시글이 없습니다.</td></tr>`,
        );
        return;
      }
      this.#setTbodyContent(createEscapeText(createPostRows)(posts));
      this.#offsetPostID = posts.at(-1).id;
      this.#observe();
      return;
    }

    // 입력된 값 전부 삭제시 offsetPostID 초기화 -> 처음인덱스부터 출력
    this.#offsetPostID = posts.length > 0 ? posts.at(-1).id : 0;
    this.#setTbodyContent(createEscapeText(createPostRows)(posts));
    this.#observe();
  };

  #renderMorePosts = (posts, { id }) => {
    if (posts.length === 0) {
      if (id === 0) {
        this.#setTbodyContent(
          `<tr><td colspan="5">아직 작성된 게시글이 없습니다.</td></tr>`,
        );
      }
      return;
    }

    this.querySelector('tbody').insertAdjacentHTML(
      'beforeend',
      createEscapeText(createPostRows)(posts),
    );

    this.#offsetPostID = posts.at(-1).id;
    this.#observe();
  };

  #fetchAndRenderRows = async isSearchEvent => {
    try {
      const category = getCategoryFromPath();
      const id = isSearchEvent ? 0 : this.#offsetPostID;
      const offset = this.#offset;

      this.#unobserve();

      const input = document.querySelector('#post-search-input');
      const title = input?.value || '';

      const queryParams = {
        category,
        id,
        offset,
        title,
      };
      const { posts } = await PostService.getPosts(queryParams, {
        signal: getSignal(),
      });

      // 검색하여 row 찾는 경우
      if (isSearchEvent) {
        this.#renderSearchResults(posts, queryParams);
        return;
      }

      this.#renderMorePosts(posts, queryParams);
    } catch (e) {
      console.error(e);
      if (e.name === 'AbortError') return;
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
      eventBus.add('fetch', this.#fetchAndRenderRows);

      this.#observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) eventBus.emit('fetch');
        },
        { threshold: 1.0 },
      );

      await eventBus.emit('fetch');

      this.#bindRowClickEvents();
    } catch (e) {
      console.error(e);
      errorBoundary(this);
    }
  }

  disconnectedCallback() {
    this.#observer.disconnect();
    this.#observer = null;
    eventBus.remove('fetch', this.#fetchAndRenderRows);
  }
}

customElements.define('post-table', PostTable);
export default PostTable;
