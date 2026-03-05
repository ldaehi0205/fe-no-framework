const createPostTable = posts => {
  return `
    <table class="post-table">
      <thead>
        <tr>
          <th>글</th>
          <th class="post-comments">댓글</th>
          <th class="post-views">조회수</th>
          <th class="post-activity">활동</th>
        </tr>
      </thead>
      <tbody>
        ${posts
          .map(
            ({ id, title, comments, views, activity }) => `
          <tr data-set="${id}">
            <td class="cell cell-title">${title}</td>
            <td class="cell cell-comments">${comments}</td>
            <td class="cell cell-views">${views}</td>
            <td class="cell cell-activity">${activity}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
  `;
};

export default createPostTable;
