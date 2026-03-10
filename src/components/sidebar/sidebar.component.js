import createSidebar from './sidebar.template.js';

import { navigate } from '../../utils/route.js';
import { getCategoryFromPath } from '../../utils/common.js';
import { RoutePath } from '../../../constant/routePath.js';

class Sidebar extends HTMLElement {
  #updateActiveState = () => {
    this.querySelectorAll('.sidebar-row').forEach(el => {
      const { path } = el.dataset;
      const pathCategory = getCategoryFromPath() || RoutePath.home;

      el.classList.toggle('active', path === pathCategory);
    });
  };

  connectedCallback() {
    this.innerHTML = createSidebar;
    this.#updateActiveState();

    this.querySelectorAll('.sidebar-row').forEach(el => {
      el.addEventListener('click', () => {
        navigate(el.dataset.path);
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
