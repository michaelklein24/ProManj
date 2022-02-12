
// const socket = io();

// username = "Romeo";
// room = "4";

// //elements
// const $messageForm = document.querySelector(".sendMessage");
// const $messageFormInput = $messageForm.querySelector(".messageInput");
// const $messageFormButton = $messageForm.querySelector(".submitMessage");
// const $sendLocationButton = document.querySelector("#submitlocation");
// const $messages = document.querySelector("#messages");


// const autoscroll = () => {
//   //New message element
//   const $newMessage = $messages.lastElementChild;
// console.log($newMessage)
//   //Height of the new message
//   const newMessageStyle = getComputedStyle($newMessage);
//   console.log(newMessageStyle)
//   const newMessageMargin = parseInt(newMessageStyle.marginBottom);
//   console.log(newMessageMargin)
//   const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;
//   console.log(newMessageHeight)

//   //Visible height
//   const visibleHeight = $messages.offsetHeight;

//   //Height of messages container
//   const containerHeight = $messages.scrollHeight;
// console.log(containerHeight)
//   //How far have i scrolled?
//   const scrollOffset = $messages.scrollTop + visibleHeight;
//   console.log(scrollOffset)
//   const scroll = containerHeight - newMessageHeight
//   console.log(scroll)
//   if (scroll <= scrollOffset) {
//     $messages.scrollTop = $messages.scrollHeight;
//   }
// };

// socket.on("message", (message) => {
//   console.log(message);
//   // document.querySelector('chat__messages')
//   const source = `<div class="message">
//   <p>
//     <span class="message__name">{{username}}</span>
//     <span class="message__meta">{{createdAt}}</span>
//   </p>
//   <p>{{message}}</p>
// </div>`;
//   const renderHtml = {
//     username: message.username,
//     message: message.text,
//     createdAt: moment(message.createdAt).format("h:mm a"),
//   };
//   const html = Handlebars.compile(source);
//   const result = html(renderHtml);
  
//   $messages.insertAdjacentHTML("beforeend", result);
//   autoscroll();
//   console.log('hey')
// });

// $messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   //disable
//   $messageFormButton.setAttribute("disabled", "disabled");
//   //   console.log(e.target.elements)
//   const message = e.target.elements.message.value;
//   console.log(message);
//   socket.emit("sendMessage", message, (error) => {
//     //enable
//     $messageFormButton.removeAttribute("disabled");
//     //clear input field
//     $messageFormInput.value = "";
//     //keep text box selected
//     $messageFormInput.focus();

//     if (error) {
//       return console.log(error);
//     }
//     console.log("Message Delivered");
//   });
// });

// socket.emit("join", { username, room }, (error) => {
//   if (error) {
//     alert(error);
//     location.href = "/";
//   }
// });
