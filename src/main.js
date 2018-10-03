
const MAX_WAIT_TIME = 500;

let time = Date.now();
let results;


let checkResults = () =>
{
    let passed = Date.now() - time;
    if (results && passed > MAX_WAIT_TIME)
    {
        recognition.stop();
        return;
    }
    setTimeout(checkResults, 1000); // TODO - move the MAX_WAIT_TIME
};

// Fix search width to give space to the microphone
let searchEl = document.querySelector('input#search');
searchEl.style.width = 'calc(100% - 35px)';
