const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

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