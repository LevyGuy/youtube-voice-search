
let recognizing = false;

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onstart = () =>
{
    recognizing = true;
};
recognition.onerror = (event) =>
{
    recognizing = false;
    alert(event.error);
};
recognition.onend = () =>
{
    recognizing = false;

    document
        .querySelector('input#search')
        .focus();

    document
        .querySelector('button#search-icon-legacy')
        .click();
};
recognition.onresult = (event) =>
{
    results = event.results[0][0].transcript;
    time = Date.now();
    document.querySelector('input#search').value = results;
};


