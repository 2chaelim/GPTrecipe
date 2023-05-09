const btn_send = document.querySelector("#btnSend");
const chatMessage = document.querySelector(".chat_message");
const foodName = document.querySelector("#foodName");
const chatCon = document.querySelector(".chatCon");
const guideChat = document.querySelector(".guide_chat");
const loader = document.querySelector(".loader");
// const restart = document.querySelector(".restart");
const chatInputCon = document.querySelector(".chat-input");
const topTitle = document.querySelector(".topTitle");
const ref = document.querySelector(".ref");

//임시로 chatcon block, guideChat은 none

chatCon.style.display = "none";
loader.style.display = "none";
// restart.style.display = "none";
chatInputCon.style.display = "none";

let userMessages = [];
let assistantMessages = [];

const sendMessage = async () => {
  guideChat.style.display = "none";
  loader.style.display = "flex";
  topTitle.style.display = "none";
  ref.style.display = "none";
  chatInputCon.style.display = "block";

  let myfoodName = foodName.value;

  const chatInput = document.querySelector(".chat-input input");
  const chatMessageDiv = document.createElement("div");
  chatMessageDiv.classList.add("chat_message");
  chatMessageDiv.innerHTML = `<p>${chatInput.value}</p>`;
  chatCon.appendChild(chatMessageDiv);

  userMessages.push(chatInput.value);
  chatInput.value = "";

  const response = await fetch(
    "https://dkvc5lr2be.execute-api.ap-northeast-2.amazonaws.com/props/gptrecipe",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        myfoodName: myfoodName,
        userMessages: userMessages,
        assistantMessages: assistantMessages,
      }),
    }
  );
  const data = await response.json();
  console.log(data.assistant);
  assistantMessages.push(data.assistant);
  const astrologerMessage = document.createElement("div");
  astrologerMessage.classList.add("chat_message");
  astrologerMessage.innerHTML = ` <p class="assistant">${data.assistant.replace(
    /\n/g,
    "<br />"
  )}</p>`;
  chatCon.appendChild(astrologerMessage);

  // chatMessage.innerHTML += data.assistant.replace(/\n/g, "<br />");

  chatCon.style.display = "block";
  chatCon.scrollTop = chatCon.scrollHeight;
  loader.style.display = "none";
  // restart.style.display = "flex";
  chatInputCon.style.display = "flex";
};
// const reStartF = () => {
//   window.location.reload();
// };

btn_send.addEventListener("click", sendMessage);
document.querySelector("#btnAsk").addEventListener("click", sendMessage);
// restart.addEventListener("click", reStartF);

// slide
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  effect: "fade",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
