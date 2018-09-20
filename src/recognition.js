
// FROM DEMOS
//      https://www.google.com/intl/en/chrome/demos/speech.html
//      https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API

let recognizing = false;

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onstart = () =>
{
    recognizing = true;
    appendListenerOverlay();
    if (!animatingListener)
    {
        animatingListener = true;
        animateListener();
    }
};
recognition.onerror = (event) =>
{
    recognizing = false;
    alert(event.error);
};
recognition.onend = () =>
{
    animatingListener = false;
    recognizing = false;
    removeListenerOverlay();
    document
        .querySelector('form#search-form')
        .submit();
};
recognition.onresult = (event) =>
{
    results = event.results[0][0].transcript;
    setListenerText(results);
    time = Date.now();
    document.querySelector('input#search').value = results;
};
