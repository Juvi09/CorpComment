// -- GLOBAL --
const MAX_CHARS = 150;

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');

// -- COUNTER COMPONENT ---
const inputHandler = () => {
    //Determine maximum number of characters.
    const maxNrChars = MAX_CHARS;

    //Determine number of characters currently typed.
    const nrCharsTyped = textareaEl.value.length;

    //Calculate number of charatcers left (maximum minus currently typed)
    const charsLeft =  maxNrChars - nrCharsTyped;

    // show number of characters left.
    counterEl.textContent = charsLeft;
    
}  

textareaEl.addEventListener('input', inputHandler);

// -- FORM COMPONENT --
const showVisualIndicator = textCheck => {
   const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';

    //Show valid indicator 
    formEl.classList.add(className);

    // remove visual indicator
    setTimeout(() => {
        formEl.classList.remove(className);
    }, 2000);
};

const submitHandler = event => {
    // prevent default broswer action (submitting from data to 'action' -address and refreshing page).
    event.preventDefault();

   // Get text from textarea
   const text = textareaEl.value;
   //console.log(text);

   //Validate text (e.g check if #hashtag is present and text is long enough)
   if (text.includes('#') && text.length >= 5){
    showVisualIndicator('valid');
   } else {
    showVisualIndicator('invalid');

    //focus textarea
    textareaEl.focus();

     // stop this function execution
     return;

   }
// we have text, now we have to extract other info from text
const hashtag = text.split(' ').find(word => word.includes('#'));  
const company = hashtag.substring(1);
const badgeLetter = company.substring(0, 1).toUpperCase();
const upvoteCount = 0;
const daysAgo = 0;

// new feedback item HTML
const feedbackItemHTML = `
<li class="feedback">
<button class="upvote">
    <i class="fa-solid fa-caret-up upvote__icon"></i>
    <span class="upvote__count">${upvoteCount}</span>
</button>
<section class="feedback__badge">
    <p class="feedback__letter">${badgeLetter}</p>
</section>
<div class="feedback__content">
    <p class="feedback__company">${company}</p>
    <p class="feedback__text">${text}</p>
</div>
<p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
</li>

`;

// insert new feedback items into list
feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

//Clear textarea
textareaEl.value = '';


//Blur submit button
submitBtnEl.blur();


//Reset counter
counterEl.textContent = MAX_CHARS;


  
};

formEl.addEventListener('submit', submitHandler);