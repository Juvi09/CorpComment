// -- GLOBAL --
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');

// -- COUNTER COMPONENT ---
const inputHandler = () => {
    //Determine maximum number of characters.
    const maxNrChars = 150;

    //Determine number of characters currently typed.
    const nrCharsTyped = textareaEl.value.length;

    //Calculate number of charatcers left (maximum minus currently typed)
    const charsLeft =  maxNrChars - nrCharsTyped;

    // show number of characters left.
    counterEl.textContent = charsLeft;
    
}  

textareaEl.addEventListener('input', inputHandler);

// -- FORM COMPONENT --
const submitHandler = event => {
    // prevent default broswer action (submitting from data to 'action' -address and refreshing page).
    event.preventDefault();

   // Get text from textarea
   const text = textareaEl.value;
   //console.log(text);

   //Validate text (e.g check if #hashtag is present and text is long enough)
   if (text.includes('#')){
      formEl.classList.add('form--valid');

      setTimeout(() => {
          formEl.classList.remove('form--valid');
      }, 2000);
   } else {
      formEl.classList.add('form--invalid');

      setTimeout(() => {
        formEl.classList.remove('form--invalid');
    }, 2000);
   }
};

formEl.addEventListener('submit', submitHandler);