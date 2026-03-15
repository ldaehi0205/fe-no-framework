import {
  createCommentSection,
  createCommentItem,
} from './post-comment.template.js';

import { escapeText, equalNumbers } from '../../utils/common.js';

class PostComment extends HTMLElement {
  #commentList = [];

  set commentList(comment_list) {
    this.innerHTML = createCommentSection(comment_list);

    const self = this;
    this.#commentList = new Proxy(comment_list, {
      get(target, prop, receiver) {
        if (prop === 'splice') {
          return (...args) => {
            const prevTarget = [...target];
            target.splice(...args);
            self.render(prevTarget, target);
            return target;
          };
        }
        if (prop === 'push') {
          return (...args) => {
            const prevTarget = [...target];
            target.push(...args);
            self.render(prevTarget, target);
            return target;
          };
        }

        return Reflect.get(target, prop, receiver);
      },
    });

    this.#bindSubmitEvent();
    this.#bindDeleteClickEvent();
  }

  render = (prevList, nextList) => {
    const beforeIDs = new Set(prevList.map(v => v.id));
    const currentIDs = new Set(nextList.map(v => v.id));

    const addComment = nextList.find(v => !beforeIDs.has(v.id));
    const delComment = prevList.find(v => !currentIDs.has(v.id));

    if (delComment) {
      const delItem = this.querySelector(`#comment-${delComment.id}`);
      delItem?.remove();
    }

    if (addComment) {
      const template = document.createElement('template');
      template.innerHTML = createCommentItem(addComment);
      const commentList = this.querySelector('.comment-list');
      commentList.appendChild(template.content);
    }
  };

  #bindDeleteClickEvent = () => {
    const commentList = this.querySelector('.comment-list');
    commentList.addEventListener('click', e => {
      const deleteBtn = e.target.closest('.comment-delete-btn');
      if (!deleteBtn) return;

      const delelteID = deleteBtn.dataset.commentDeleteId;

      const index = this.#commentList.findIndex(v =>
        equalNumbers(v.id, delelteID),
      );

      if (index < 0) return;
      this.#commentList.splice(index, 1);
    });
  };

  #bindSubmitEvent = () => {
    const commentForm = this.querySelector('.comment-form');
    commentForm.addEventListener('submit', e => {
      e.preventDefault();

      this.#submitComment();
      commentForm.reset();
    });
  };

  #submitComment = () => {
    const author = this.querySelector('.comment-form-author');
    const content = this.querySelector('.comment-form-textarea');

    const comment = {
      id: Math.floor(Math.random() * 1000),
      author: escapeText(author.value),
      content: escapeText(content.value),
      created_at: Date.now(),
    };

    this.#commentList.push(comment);
  };
}

customElements.define('post-comment', PostComment);

export default PostComment;
