// -- GLOBAL --
const MAX_CHARS = 150;

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');

const renderFeedbackItem = feedbackItem => {
  // new feedback item HTML
  const feedbackItemHTML = `
<li class="feedback">
<button class="upvote">
    <i class="fa-solid fa-caret-up upvote__icon"></i>
    <span class="upvote__count">${feedbackItem.upvoteCount}</span>
</button>
<section class="feedback__badge">
    <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
</section>
<div class="feedback__content">
    <p class="feedback__company">${feedbackItem.company}</p>
    <p class="feedback__text">${feedbackItem.text}</p>
</div>
<p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
</li>

`;

// insert new feedback items into list
feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);


};


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


//create feedback item object, render feeback item in list.
const feedbackItem = {
    upvoteCount: upvoteCount,
    company: company,
    badgeLetter: badgeLetter,
    daysAgo: daysAgo,
    text: text

};
renderFeedbackItem(feedbackItem);

//send feedback items to server
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks', {
  method: 'POST',
  body: feedbackItem
})


//Clear textarea
textareaEl.value = '';


//Blur submit button
submitBtnEl.blur();


//Reset counter
counterEl.textContent = MAX_CHARS;


  
};

formEl.addEventListener('submit', submitHandler);

// -- FEEDBACK LIST COMPONENT --
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
   .then(response => {
       return response.json();
   })
   .then(data => {
      //console.log(data.feedbacks[7]);

      //remove spinner
      spinnerEl.remove();

      //Iterate over each element in the feedbacks array and render it in the list
      data.feedbacks.forEach(feedbackItem => {
              renderFeedbackItem(feedbackItem);
      });
})
.catch(error => {
   feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
});