//Explanation:
//"En" for English
//"De" for German

//Adding new Vocabulary
const newVocabEnInput = document.querySelector("#newVocabEnInput") as HTMLInputElement; 
const newVocabDeInput = document.querySelector("#newVocabDeInput") as HTMLInputElement;
const newVocabBtn = document.querySelector("#newVocabBtn") as HTMLButtonElement;
const emptyVocabBtn = document.querySelector("#emptyVocabBtn") as HTMLButtonElement;

//Check if correct input or not with message
const validatorMessage = document.querySelector("#validatorMessage") as HTMLSpanElement;

//Container to show Vocabulary list
const vocabEnContainer = document.querySelector("#vocabEnContainer") as HTMLDivElement;
const vocabDeContainer = document.querySelector("#vocabDeContainer") as HTMLDivElement;

//Information to save inside of each Vocabulary (En & De)
interface VocabEn {
  description: string; //the word
  id: string; //randomized ID
  timestamp: Date;
}
interface VocabDe {
  description: string;
  id: string;
  timestamp: Date;
}

//Generating Unique ID
function genUniqueId(): string {
  const dateStr = Date
    .now()
    .toString(36); 
  const randomStr = Math
    .random()
    .toString(36)
    .substring(2, 8);

  return `${dateStr}-${randomStr}`;
}

//Check if input field has an input 
function validateInput() {
  if (!newVocabEnInput.value) {
      newVocabBtn.disabled = true;
    setValidatorMesssage(ValidatorMessages.INPUT_EMTPY, true);
    return false;
  }
  if (!newVocabDeInput.value) {
      newVocabBtn.disabled = true;
    setValidatorMesssage(ValidatorMessages.INPUT_EMTPY, true);
    return false;
  }
  else {
      newVocabBtn.disabled = false;
    setValidatorMesssage(ValidatorMessages.INPUT_VALID);
    return true;
  }
}

//Messages for User after the check of input (write blue text)
function setValidatorMesssage(msg: string, error = false) {
  validatorMessage.innerHTML = msg;
    validatorMessage.style.color = "blue";
}
const ValidatorMessages = {
  INPUT_EMTPY: "Es fehlen noch Eingaben :) ",
  INPUT_VALID: "Drücke den Knopf oder Enter um deine Eingabe zu bestätigen!",
};

//Adding Arrays to fill with the Vocabs (En & De)
let vocabEn: VocabEn[] = [];
let vocabDe: VocabDe[] = [];

//Add new Vocabulary (En) 
function addVocabEn() {
  //if input not correct:
  if (!validateInput()) {
    return; 
  }
  const timestamp = new Date();
  const newVocabEn: VocabEn = {
    description: newVocabEnInput.value, 
    id: `${genUniqueId()}`,
    timestamp,
  };
  vocabEn.push(newVocabEn);
  reloadVocabEn();
  addVocabDe();
  newVocabEnInput.value = "";
}
//Add new Vocabulary (De)
function addVocabDe() {
  //if input not correct:
  if (!validateInput()) {
    return; 
  }
  const timestamp = new Date();
  const newVocabDe: VocabDe = {
    description: newVocabDeInput.value,
    id: `${genUniqueId()}`,
    timestamp,
  };
  vocabDe.push(newVocabDe);
  reloadVocabDe();
  newVocabDeInput.value = "";
}

//Empty Vocabulary List, Create Container for Vocabulary (En)
function reloadVocabEn() {
  vocabEnContainer.innerHTML = "";
  //sorting Vocabulary
  vocabEn
    .sort((vocab1, vocab2) => {return vocab2.timestamp.getTime() - vocab1.timestamp.getTime();})
    .forEach((vocabEn) => {
      const singleVocabEnContainer = document.createElement("div");
      singleVocabEnContainer.id = vocabEn.id;
      singleVocabEnContainer.innerHTML = ` ${vocabEn.description}`;
      vocabEnContainer.appendChild(singleVocabEnContainer);
    });}

//Empty Vocabulary List, Create Container for Vocabulary (De)
    function reloadVocabDe() {
      vocabDeContainer.innerHTML = "";
    vocabDe
    .sort((vocab3, vocab4) => {return vocab4.timestamp.getTime() - vocab3.timestamp.getTime();})
    .forEach((vocabDe) => {
      const singleVocabDeContainer = document.createElement("div");
      singleVocabDeContainer.id = vocabDe.id;
      singleVocabDeContainer.innerHTML = `${vocabDe.description} `;
      vocabDeContainer.appendChild(singleVocabDeContainer);
    });
}

function hasPressedEnterKeyOnTodoInput(e: KeyboardEvent) {
  if (e.key === "Enter") {
    addVocabEn();
    addVocabDe(); 
  }
}

//Clear whole List
function emptyVocabList(){
  vocabEnContainer.innerHTML="";
  vocabDeContainer.innerHTML="";
  newVocabEnInput.innerHTML = "";
  newVocabDeInput.innerHTML = "";
  while(vocabEn.length){
    vocabEn.pop();
  }
  while(vocabDe.length){
    vocabDe.pop();
  }
}

//main function
function initApp() {
  newVocabBtn.disabled = true;
  newVocabBtn.addEventListener("click", addVocabEn);
  emptyVocabBtn.addEventListener("click", emptyVocabList);
  newVocabEnInput.addEventListener("input", validateInput);
  newVocabDeInput.addEventListener("input", validateInput);
  newVocabEnInput.addEventListener("keydown", hasPressedEnterKeyOnTodoInput);
  newVocabDeInput.addEventListener("keydown", hasPressedEnterKeyOnTodoInput);
}
initApp();