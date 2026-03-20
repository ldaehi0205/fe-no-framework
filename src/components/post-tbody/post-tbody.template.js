const createPostRows = posts => {
  return `
	 ${posts
     .map(
       ({ id, title, comments, views, activity }) => `
          <tr id="row-${id}" data-id="${id}">
            <td class="cell cell-id">${id}</td>
            <td class="cell cell-title">${title}</td>
            <td class="cell cell-comments">${comments}</td>
            <td class="cell cell-views">${views}</td>
            <td class="cell cell-activity">${activity}</td>
          </tr>
        `,
     )
     .join('')}`;
};

const createPostTable = () => `
		<search-bar></search-bar>    
    <table class="post-table">
      <thead>
        <tr>
					<th class="post-id">ID</th>
          <th>글</th>
          <th class="post-comments">댓글</th>
          <th class="post-views">조회수</th>
          <th class="post-activity">활동</th>
        </tr>
      </thead>
      <tbody id="post-tbody">      
      </tbody>
    </table>
  `;
export { createPostTable, createPostRows };
