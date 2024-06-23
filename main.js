import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const $ = (element) => document.querySelector(element);
const $form = $("form");
const $input = $("input");
const $template = $("#message-template");
const $messages = $("ul");
const $container = $("main");
const $button = $("button");
const $info = $("small");

const SELECTED_MODEL = "gemma-2b-it-q4f32_1-MLC";


let messages = [];




//async function createEngine() {
  console.time("engine");
  const engine = await CreateMLCEngine(SELECTED_MODEL,{ 
    initProgressCallback: (info) => {
      //console.log(info);
      $info.textContent = `${info.text}%`
      if(info.progress === 1) $button.removeAttribute('disabled'); 
    }
  });
  console.timeEnd("engine");
  console.log("Modelo cargado");

//}



//createEngine();


$form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const messageText = $input.value.trim();
  
  if(messageText !== '') $input.value = '';

  addMessage(messageText, "user");
  $button.setAttribute("disabled",true);

  const userMessage = { role:'user', content: messageText };
  messages.push(userMessage);

  const reply = await engine.chat.completions.create({
    messages: messages,
    //stream: true
  })

  // let reply = "";

  // for await (const chunk of chunks) { 
  //   console.log(chunk.choices);
  // }


  const botMessage = reply.choices[0].message.content;
  messages.push(botMessage)
  addMessage(botMessage,'bot');
  $button.removeAttribute("disabled");

});

function addMessage(text, sender) {
  const clonedTemplate = $template.content.cloneNode(true);
  const $newMessage = clonedTemplate.querySelector(".message");
  const $who = $newMessage.querySelector("span");
  const $text = $newMessage.querySelector("p");

  $text.textContent = text;
  $who.textContent = sender === "bot" ? "Bot" : "Tú";
  $newMessage.classList.add(sender);

  $messages.appendChild($newMessage);
  $container.scrollTop = $container.scrollHeight;
}
