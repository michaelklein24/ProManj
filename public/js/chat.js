
const socket = io();


//elements


const userName = document.querySelector('#helloText')
const username = userName.textContent.split(' ')[1]
const $messageForm = document.querySelector(".sendMessage");
const $messageFormInput = $messageForm.querySelector(".messageInput");
const $messageFormButton = $messageForm.querySelector(".submitMessage");
const $sendLocationButton = document.querySelector("#submitLocation");
const $messages = document.querySelector("#messages");
const $nameBar = document.querySelector('#membersList')

const { room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  

const autoscroll = () => {
  //New message element
  const $newMessage = $messages.lastElementChild;
console.log($newMessage)
  //Height of the new message
  const newMessageStyle = getComputedStyle($newMessage);
  console.log(newMessageStyle)
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  console.log(newMessageMargin)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;
  console.log(newMessageHeight)

  //Visible height
  const visibleHeight = $messages.offsetHeight;

  //Height of messages container
  const containerHeight = $messages.scrollHeight;
console.log(containerHeight)
  //How far have i scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;
  console.log(scrollOffset)
  const scroll = containerHeight - newMessageHeight
  console.log(scroll)
  if (scroll <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};




socket.on("message", (message) => {
  
  // document.querySelector('chat__messages')
  const source = `<div class="message">
  <p>
    <span class="message__name">{{username}}</span>
    <span class="message__meta">{{createdAt}}</span>
  </p>
  <p>{{message}}</p>
</div>`;
const username = message.username
  const renderHtml = {
    username: username[0].toUpperCase()+ username.substring(1),
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  };
  const html = Handlebars.compile(source);
  const result = html(renderHtml);
  
  $messages.insertAdjacentHTML("beforeend", result);
  autoscroll();
  
});

// socket.on('roomData', ({room, users})=>{
//   console.log(users)
//   users.forEach((user)=>{
//     const source =`<div class="d-flex gap-2 align-items-center">
    
//     <div class="onlineDot"></div>
//     <h4 class="memberName">{{theUsers}}</h4>
    
//   </div>`
//   const name = user.username
//   console.log(user)
//   console.log(name)
  
//   const renderHtml = {
//     room,
//     theUsers: name[0].toUpperCase()+ name.substring(1)
//   };
//   console.log(user.username)
//   console.log(room)
//   const html = Handlebars.compile(source);
//   const result = html(renderHtml);
//   $nameBar.innerHTML = result
//   })
 
// })

socket.on("locationMessage", (message) => {
  console.log(message)
  // document.querySelector('chat__messages')
  const source = `<div class="message">
  <p>
    <span class="message__name">{{username}}</span>
    <span class="message__meta">{{createdAt}}</span>
  </p>
  <p> <a href="{{url}}" target="_blank">My current location</a></p>
</div>`;
const username = message.username
const renderHtml = {
  username: username[0].toUpperCase()+ username.substring(1),
    url: message.url,
    createdAt: moment(message.createdAt).format("h:mm a"),
  };
  const html = Handlebars.compile(source);
  const result = html(renderHtml);
  
  $messages.insertAdjacentHTML("beforeend", result);
  autoscroll();
  
});




$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //disable
  $messageFormButton.setAttribute("disabled", "disabled");
  //   console.log(e.target.elements)
  const message = $messageFormInput.value;
  
  socket.emit("sendMessage", message, (error) => {
    //enable
    $messageFormButton.removeAttribute("disabled");
    //clear input field
    $messageFormInput.value = "";
    //keep text box selected
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
    console.log("Message Delivered");
  });
});


$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not support by your brower');
  }

  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    socket.emit('sendLocation', { latitude, longitude }, () => {
      console.log('Location Shared');

      $sendLocationButton.removeAttribute('disabled');
    });
  });
});


socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

