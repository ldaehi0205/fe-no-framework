import {
  createCommentSection,
  createCommentItem,
} from './post-comment.template.js';

import { escapeText, equalNumbers } from '../../utils/common.js';

class PostComment extends HTMLElement {
  #beforeCommentList = [];
  #commentList = [];

  set commentList(comment_list) {
    this.innerHTML = createCommentSection(comment_list);
    this.#commentList = comment_list;

    this.#bindSubmitEvent();
    this.#bindDeleteClickEvent();
  }

  #bindDeleteClickEvent = () => {
    const commentList = this.querySelector('.comment-list');
    commentList.addEventListener('click', e => {
      const deleteBtn = e.target.closest('.comment-delete-btn');
      if (!deleteBtn) return;

      const delelteID = deleteBtn.dataset.commentDeleteId;

      this.#beforeCommentList = [...this.#commentList];
      this.#commentList = this.#beforeCommentList.filter(
        ({ id }) => !equalNumbers(id, delelteID),
      );

      this.#renderRemoveComment();
    });
  };

  #bindSubmitEvent = () => {
    const commentForm = this.querySelector('.comment-form');
    commentForm.addEventListener('submit', e => {
      e.preventDefault();

      this.#submitComment();
      this.#renderAddComment();
      commentForm.reset();
    });
  };

  #renderAddComment = () => {
    const beforeIDs = new Set(this.#beforeCommentList.map(v => v.id));
    const addComment = this.#commentList.find(v => !beforeIDs.has(v.id));
    if (!addComment) return;

    const template = document.createElement('template');
    template.innerHTML = createCommentItem(addComment);
    const commentList = this.querySelector('.comment-list');
    commentList.appendChild(template.content);
  };

  #renderRemoveComment = () => {
    const currentIDs = new Set(this.#commentList.map(v => v.id));
    const delComment = this.#beforeCommentList.find(v => !currentIDs.has(v.id));

    if (!delComment) return;
    const delItem = this.querySelector(`#comment-${delComment.id}`);
    delItem?.remove();
  };

  #submitComment = () => {
    const author = this.querySelector('.comment-form-author');
    const content = this.querySelector('.comment-form-textarea');

    const comment = {
      id: Math.floor(Math.random() * 1000), //
      author: escapeText(author.value),
      content: escapeText(content.value),
      created_at: Date.now(),
    };

    this.#beforeCommentList = [...this.#commentList];
    this.#commentList = [...this.#commentList, comment];
  };
}

customElements.define('post-comment', PostComment);

export default PostComment;
