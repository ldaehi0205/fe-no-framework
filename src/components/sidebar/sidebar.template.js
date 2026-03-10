import { RoutePath } from '../../../constant/routePath.js';

const createSidebar = `			
   			<ul class="sidebar-content">
          <li class="sidebar-row" data-path=${RoutePath.home}>            
              <span class="sidebar-row-icon">📖</span>
              <span class="sidebar-row-text">최신 글</span>            
          </li>
          <li class="sidebar-row" data-path=${RoutePath.dev}>            
              <span class="sidebar-row-icon">💻</span>
              <span class="sidebar-row-text">개발</span>            
          </li>
          <li class="sidebar-row" data-path=${RoutePath.notice}>            
              <span class="sidebar-row-icon">💡</span>
              <span class="sidebar-row-text">개발 공지사항</span>            
          </li>
        </ul>
  `;

export default createSidebar;
