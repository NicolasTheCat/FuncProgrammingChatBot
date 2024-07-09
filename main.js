import "./style.css";
import { MATHINFO } from "./bots/math";
import { MEMOINFO } from "./bots/memo";
import { WIKIINFO } from "./bots/wiki";

const CONTACTS = [MATHINFO, MEMOINFO, WIKIINFO];

const BOTLISTROOT = document.getElementById("contactList");
const CHATBOX = document.getElementById("chatBox");
const MESSINPUT = document.getElementById("messageInput");
const SENDBUT = document.getElementById("sendButton");
const CLEARBUT = document.getElementById("clearButton");

function addContact(contactInfo) {
  const { name, avatar } = contactInfo;

  const contactElement = document.createElement("li");
  contactElement.textContent = name;
  contactElement.className = "contactItem";
  contactElement.id = `contactElement${name}`;

  const contactAvatar = document.createElement("img");
  contactAvatar.src = `/${avatar}`;
  contactAvatar.className = "contactAvatar";

  contactElement.appendChild(contactAvatar);
  BOTLISTROOT.appendChild(contactElement);
}

document.addEventListener("DOMContentLoaded", loadMessages());
SENDBUT.addEventListener("click", sendMessage);
MESSINPUT.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
CLEARBUT.addEventListener("click", () => {
  localStorage.clear();
  CHATBOX.innerHTML = "";
});

async function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  console.log("Message:", message);
  if (message === "") return;
  input.value = "";

  addAndSave("USER", message);

  const command = message.split(" ")[0].toLowerCase();
  const args = message.substring(command.length).trim();

  for (const contact of CONTACTS) {
    if (contact.commands[command]) {
      addAndSave(contact.name, await contact.commands[command](args));
    }
  }
}

function saveMessage(sender, message) {
  const timestamp = new Date().toLocaleTimeString();
  const messages =
    JSON.parse(localStorage.getItem("progFuncProjMessage")) || [];
  messages.push({ sender, message, timestamp });
  localStorage.setItem("progFuncProjMessage", JSON.stringify(messages));
}

function loadMessages() {
  const messages =
    JSON.parse(localStorage.getItem("progFuncProjMessage")) || [];
  messages.forEach((msg) => {
    addMessageToPage(msg.sender, msg.message, msg.timestamp);
  });
}

function addMessageToPage(sender, message, timestamp) {
  if (!timestamp) {
    timestamp = new Date().toLocaleTimeString();
  }

  const container = document.createElement("div");

  const messageElement = document.createElement("div");
  messageElement.className = "message";

  const messageText = document.createElement("div");
  messageText.innerHTML = message;

  const messageInfo = document.createElement("div");
  messageInfo.className = "message-info";

  if (sender != "USER") {
    container.className = "message-container bot-message";

    messageInfo.textContent = `${sender} - ${timestamp}`;

    const { avatar } = CONTACTS.find((e) => e.name == sender);

    const avatarElement = document.createElement("img");
    avatarElement.className = "avatar";
    avatarElement.src = avatar;

    container.appendChild(avatarElement);
  } else {
    container.className = "message-container user-message";

    messageInfo.textContent = `${"Vous"} - ${timestamp}`;
  }

  messageElement.appendChild(messageInfo);
  messageElement.appendChild(messageText);
  container.appendChild(messageElement);
  CHATBOX.appendChild(container);
  CHATBOX.scrollTop = CHATBOX.scrollHeight;
}

function addAndSave(sender, message) {
  if (!message || message.trim().length == 0) {
    return;
  }
  addMessageToPage(sender, message);
  saveMessage(sender, message);
}

CONTACTS.forEach((e) => addContact(e));
