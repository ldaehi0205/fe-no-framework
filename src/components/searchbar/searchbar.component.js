import createSearchbar from './searchbar.template.js';
import eventBus from '../../utils/eventBus.js';
import { debounce } from '../../utils/common.js';

import { navigate } from '../../utils/route.js';
import { getCategoryFromPath } from '../../utils/common.js';
import { RoutePath } from '../../../constant/routePath.js';

class Searchbar extends HTMLElement {
  #debounceFn = null;

  connectedCallback() {
    this.innerHTML = createSearchbar();

    const input = this.querySelector('#post-search-input');

    this.#debounceFn = debounce(() => eventBus.emit('fetch', 'keyup'), 500);

    input.addEventListener('keyup', e => {
      this.#debounceFn();
    });
  }

  disconnectedCallback() {
    this.#debounceFn = null;
  }
}

customElements.define('search-bar', Searchbar);
export default Searchbar;
