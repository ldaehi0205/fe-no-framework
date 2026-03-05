const createPostDetail = ({ title, category, author, date, sections }) => `
    <div>
      <div class="post-detail-header">
              <h1 class="post-detail-title">${title}</h1>
              <div class="post-detail-category">${category}</div>
            </div>
            <div class="post-detail-meta">
              <div class="post-detail-author">${author}</div>
              <div class="post-detail-date">${date}</div>
            </div>
            <div class="post-detail-body">
              <div class="post-detail-section">
                <h3 class="post-detail-section-label">
                  이 글의 성격은 무엇인가요?
                </h3>
                <div class="post-detail-section-value">${sections.distinction}</div>
              </div>
              <div class="post-detail-section">
                <h3 class="post-detail-section-label">내용을 설명해주세요.</h3>
                <div class="post-detail-section-value">
							  ${sections.description}
                </div>
              </div>
              <div class="post-detail-section">
                <h3 class="post-detail-section-label">appName (선택)</h3>
                <div class="post-detail-section-value">${sections.appName || '없음'}</div>
              </div>
            </div>
          </div>
`;

export default createPostDetail;
