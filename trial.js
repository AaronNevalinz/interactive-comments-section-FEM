function displayData(data) {
    const container = document.getElementById('dynamic-content');
    if (!container) {
        console.error("Container element not found.");
        return;
    }

    function generateCommentHTML(comment) {
        let html = `
            <ul class="comment__list">
                <li class="comment">
                    <div class="comment__body">
                        <div class="comment__body-wrapper">

                            <div class="comment__upvote">
                                <span class="plus" data-score="${comment.score}">+</span>
                                <span class="comment-score">${comment.score}</span>
                                <span>-</span>
                            </div>

                            <div>
                                <div class="comment__author">
                                    <div class="comment__author-info">
                                        <img class="pp__img" src="${comment.user.image.png}" alt="">
                                        <span class="author-name">${comment.user.username}</span>
                                        <span class="post-time">${comment.createdAt}</span>
                                    </div>
                                    <div class="replyBtn">
                                        <button class="reply-btn">Reply</button>
                                    </div>
                                </div>

                                <div>
                                    <p class="comment-data">
                                        ${comment.content}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </li>
            </ul>
        `;

        if (comment.replies.length > 0) {
            html += '<div class="nested-comments">';
            comment.replies.forEach(reply => {
                html += generateCommentHTML(reply);
            });
            html += '</div>';
        }

        return html;
    }

    let html = '';

    data.comments.forEach(comment => {
        html += generateCommentHTML(comment);
    });

    container.innerHTML = html;

    // Add event listeners to plus buttons
    const plusButtons = document.querySelectorAll('.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const scoreElement = button.parentNode.querySelector('.comment-score');
            if (scoreElement) {
                let score = parseInt(scoreElement.textContent);
                score++;
                scoreElement.textContent = score;
            } else {
                console.error("Score element not found.");
            }
        });
    });

    // Add event listeners to reply buttons
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const commentContainer = button.closest('.comment');
            const replyForm = document.createElement('form');
            replyForm.innerHTML = `
                <div class="reply-form">
                    <textarea name="replyContent" cols="50" rows="3"></textarea>
                    <button type="submit">Reply</button>
                </div>
            `;
            commentContainer.appendChild(replyForm);

            replyForm.addEventListener('submit', event => {
                event.preventDefault();
                const replyContent = replyForm.querySelector('textarea').value;
                if (replyContent.trim() !== '') {
                    // Assuming you have a function to handle submitting the reply
                    // You would send the reply content along with the parent comment ID to your backend
                    // After successfully submitting, you may update the UI to display the new reply
                    console.log("Reply submitted:", replyContent);
                    replyForm.remove(); // Remove the reply form after submission
                } else {
                    alert("Please enter a valid reply.");
                }
            });
        });
    });
}
