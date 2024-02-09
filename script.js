document.addEventListener('DOMContentLoaded', ()=>{
    fetch('data.json')
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(error => console.error(error)
  );
});


// function displayData(data) {
//         const container = document.getElementById('dynamic-content');
//         // let currentUserName = data.currentUser.username;
//         // let currentUSerImg = data.currentUser.image.png;

//         let html =''; 
        
//         data.comments.forEach((comment)=>{
//             html += `
//             <ul class="comment__list">
//               <li class="comment">
//                 <div class="comment__body">
//                   <div class="comment__body-wrapper">
    
//                     <div class="comment__upvote">
//                       <span class='plus' data-score="${comment.score}">+</span>
//                       <span>${comment.score} </span>
//                       <span class='minus'>-</span>
//                     </div>
    
//                     <div>
//                       <div class="comment__author">
//                         <div class="comment__author-info">
//                           <img class="pp__img" src=${comment.user.image.png} alt="">
//                           <span class="author-name">${comment.user.username}</span>
//                           <span class="post-time">${comment.createdAt}</span>
//                         </div>
      
//                         <div class="replyBtn">
//                           <img src="./images/icon-reply.svg" alt="">
//                           <span class="">Reply</span>
//                         </div>
//                       </div>
    
//                       <div>
//                         <p class="comment-data">
//                           ${comment.content}
//                         </p>
//                       </div>
//                     </div>
    
//                   </div>
//                 </div>
//               </li>
//           </ul>
//     `;
//     comment.replies.forEach((reply)=>{
//       html+=`
//       <ul class="reply__list">

//       <li class="reply">
//         <div class="comment__body">
//           <div class="comment__body-wrapper">

//             <div class="comment__upvote">
//               <span class='plus'>+</span>
//               <span>${reply.score}</span>
//               <span class='minus'>-</span>
//             </div>

//             <div>
//               <div class="comment__author">
//                 <div class="comment__author-info">
//                   <img class="pp__img" src=${reply.user.image.png} alt="">
//                   <span class="author-name">${reply.user.username}</span>
//                   <span class="post-time">${reply.createdAt}</span>
//                 </div>
//                 <div class="replyBtn">
//                   <img src="./images/icon-reply.svg" alt="">
//                   <span>Reply</span>
//                 </div>
//               </div>

//               <div>
//                 <p class="comment-data">
//                  ${reply.content}
//                 </p>
//               </div>
//             </div>


//           </div>
//         </div>
//       </li>
//     </ul>
//       `;
//     });
//   });
  
        
//         container.innerHTML = html;

//         const plusButtons = document.querySelectorAll('.plus');
//         plusButtons.forEach(button => {
//           button.addEventListener('click', ()=>{
//             const scoreElement = button.nextElementSibling;
//             let score = parseInt(scoreElement.textContent);
//             score++;
//             scoreElement.textContent = score;
//           });
//         });

//         const minusButtons = document.querySelectorAll('.minus');
//         minusButtons.forEach(button => {
//           button.addEventListener('click', ()=>{
//             const scoreElement = button.previousElementSibling;
//             let score = parseInt(scoreElement.textContent);
//             score--;
//             scoreElement.textContent = score;
//           });
//         });
        
// }

function displayData(data){

  const container = document.getElementById('dynamic-content');
  
  if(!container){
    console.error('Container element not found...');
    return;
  }

  function generateCommentHTML(comment){
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
                                <button class="reply-btn">
                                <span><img src="./images/icon-reply.svg" alt="icon svg"/></span>
                                <span>Reply</span>
                                </button>
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

    if(comment.replies){
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


  // adding the currentUser you button and edit and delete buttons.
  const currentUser = data.currentUser.username;
  const username = [...document.getElementsByClassName('author-name')];

  username.forEach(name=>{
    if(name.textContent === currentUser){
      const mark = document.createElement('span');
      mark.innerHTML = '<p class="currentUser">You</p>'
      name.appendChild(mark);

      let button = name.parentElement.nextElementSibling;
      button.classList.remove('replyBtn')
      button.innerHTML = `<div class='user-btn'>
                        <span id='deleteBtn'>
                          <img src='./images/icon-delete.svg'/>
                          <p>Delete</p>
                        </span>
                        <span>
                          <img src='./images/icon-edit.svg'/>
                          <p>Edit</p>
                        </span>
                    </div>`;
    }
    
  });

  const deleteBtn = document.getElementById('deleteBtn');
  const popup = document.getElementById('popup');
  deleteBtn.addEventListener('click', ()=>{
    popup.classList.remove('hidden');
  })

  const plusButtons = document.querySelectorAll('.plus');
  plusButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
      const scoreElement = button.parentNode.querySelector('.comment-score');
      if(scoreElement){
        let score = parseInt(scoreElement.textContent);
        score++;
        scoreElement.textContent = score;
      } else {
        console.error('Score element not found...');
      }
    });
  });


  // Add event listeners to reply buttons
  const replyButtons = document.querySelectorAll('.replyBtn');
  replyButtons.forEach(button => {
      button.addEventListener('click', () => {
          const commentContainer = button.closest('.app__comment-container');
          const replyForm = document.createElement('form');
          const user = data.currentUser;
          const authorName = button.closest('.comment__author').querySelector('.author-name').textContent;
          
          replyForm.innerHTML = `
          <div id="form" class="form-wrapper">
            <form action="" class="form-container form">
              <img class="pp__img" src="${user.image.png}" alt="">
              <textarea name="" id="" placeholder="Add a comment...." cols="30" rows="4"></textarea>
              <button>SEND</button>
            </form>
          </div>
          `;
          replyForm.querySelector('textarea').value = "@" + authorName + " ";


          
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
