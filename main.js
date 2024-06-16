import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const SELECTED_MODEL = 'gemma-2b-it-q4f32_1-MLC';


async function createEngine(){
	console.time('engine');
	const engine = await CreateMLCEngine(SELECTED_MODEL,{
		initProgressCallBack:(info)=>{
			console.log('initProgressCallBack',info);
		}
	});
	console.timeEnd('engine');
	console.log('Modelo cargado');
}

createEngine();


const $ = (element) => document.querySelector(element);
const $form = $("form");
const $input = $("input");
const $template = $("#message-template");
const $messages = $("ul");
const $container = $("main");
const $button = $("button");

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const messageText = $input.value.trim();
  $input.value = messageText !== "" ? "" : messageText;

	addMessage(messageText, "user");
	$button.setAttribute('disabled',true);

	setTimeout(()=>{
		addMessage("Hola cómo estais?", "bot");
		$button.removeAttribute('disabled');
	},2000);

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
