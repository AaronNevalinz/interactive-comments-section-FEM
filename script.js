// fetch('data.json')
//     .then(res => res.json())
//     .then(data => displayData(data))
//     .catch(error => console.error(error)
// );

// function displayData(data) {
//         const container = document.getElementById('dynamic-content');
//         let currentUserName = data.currentUser.username;
//         let currentUSerImg = data.currentUser.image.png;

//         let html = data.comments.map((comment)=>(
//             `
//             <div class="container__wrapper">
//               <div class="comment__container" id='comment'>

//                 <div class="comment__upvote">
//                   <span class="comment__upvote-plus">+</span>
//                   <span class="comment__upvote-count">${comment.score}</span>
//                   <span class="comment__upvote-minus">-</span>
//                 </div>
              
//                 <div class="comment__container-body">
//                   <div class="comment__container-body_op">
//                     <div class="comment__container-body-op_profile">
//                       <img class="pp__img" src=${comment.user.image.png} alt="">
//                       <p>
//                         <span class="comment__name">${comment.user.username}</span>
//                         <span class="comment__time">${comment.createdAt}</span>  
//                       </p>
//                     </div>
          
//                     <div class="comment__container-body-op_replyBtn replyBtn" >
//                       <img src="./images/icon-reply.svg" alt="">
//                       <p>Reply</p>
//                     </div>
//                   </div>
          
//                   <div class="comment__container-body_data">
//                     <p>
//                       ${comment.content}
//                     </p>
//                   </div>
//                 </div>

//               </div>

//               <div class='comment__reply reply'>
//                   <div>
//                     <img src=${currentUSerImg} alt='User Image'/>
//                   </div>
//                   <div>
//                     <textarea cols='60' rows='5' placeholder=@${comment.user.username}></textarea>
//                   </div>
//                   <div class='comment__reply-btn'>
//                     <button>REPLY</button>
//                   </div>
//               </div>
//             </div>
//             `
//         ));

//         container.innerHTML = html;

// }


