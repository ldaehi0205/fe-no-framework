import createSidebar from './sidebar.template.js';

import { navigate } from '../../utils/route.js';
import { getCategoryFromPath } from '../../utils/common.js';

class Sidebar extends HTMLElement {
  #updateActiveState = () => {
    this.querySelectorAll('.sidebar-row').forEach(el => {
      const { category } = el.dataset;
      const { pathname } = window.location;
      const pathCategory = getCategoryFromPath();

      el.classList.toggle(
        'active',
        pathname === '/' ? category === 'latest' : category === pathCategory,
      );
    });
  };

  connectedCallback() {
    this.innerHTML = createSidebar;
    this.#updateActiveState();

    this.querySelectorAll('.sidebar-row').forEach(el => {
      el.addEventListener('click', () => {
        navigate(`/${el.dataset.category}`);
        this.#updateActiveState();
      });
    });

    window.addEventListener('popstate', this.#updateActiveState);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.#updateActiveState);
  }
}

customElements.define('side-bar', Sidebar);
export default Sidebar;
