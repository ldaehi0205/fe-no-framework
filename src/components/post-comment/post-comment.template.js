import { formatTimestamp } from '../../utils/common.js';

const getInitialAvatar = name => name.substring(0, 1);

export const createCommentItem = ({ id, author, created_at, content }) => `
	<li id="comment-${id}" class="comment-item">
		<div class="comment-left">
			<div class="comment-avatar">${getInitialAvatar(author)}</div>
			<div class="comment-thread-line"></div>
		</div>
		<div class="comment-content">
			<div class="comment-meta">
				<span class="comment-author">${author}</span>
				<span class="comment-date">${formatTimestamp(created_at)}</span>
				<span class="comment-number">#${id}</span>
				<button type="button" class="comment-delete-btn" data-comment-delete-id="${id}">삭제</button>
			</div>
			<p class="comment-text">${content}</p>
		</div>
	</li>
`;

const createCommentForm = () => `
	<form class="comment-form">
		<div class="comment-form-row">
			<input
				type="text"
				class="comment-form-input comment-form-author"
				name="author"
				placeholder="이름"
				maxlength="20"
				required
			/>
		</div>
		<div class="comment-form-row">
			<textarea
				class="comment-form-input comment-form-textarea"
				name="content"
				placeholder="댓글을 작성하세요..."
				rows="4"
				maxlength="500"
				required
			></textarea>
		</div>
		<div class="comment-form-footer">
			<button type="submit" class="comment-form-submit">댓글 작성</button>
		</div>
	</form>
`;

export const createCommentSection = (comment_list = []) => `
	<div class="comment-section">
		<h3 class="comment-section-title">
			<span class="comment-count">${comment_list.length}</span>개의 댓글
		</h3>
		<ul class="comment-list">
			${comment_list.map(comment => createCommentItem(comment)).join('')}
		</ul>
		${createCommentForm()}
	</div>
`;
