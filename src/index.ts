//Explanation:
//"En" for English
//"De" for German

//Adding new Vocabulary
const newVocabEnInput = document.querySelector("#newVocabEnInput") as HTMLInputElement; 
const newVocabDeInput = document.querySelector("#newVocabDeInput") as HTMLInputElement;
const newVocabBtn = document.querySelector("#newVocabBtn") as HTMLButtonElement;

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


