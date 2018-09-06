
// FROM DEMOS
//      https://www.google.com/intl/en/chrome/demos/speech.html
//      https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API

'use strict';

let recognizing = false;
let time = Date.now();
let results;
const searchBtn = document
    .querySelector('button#search-icon-legacy');

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
    searchBtn.focus();
    searchBtn.click();
};
recognition.onresult = (event) =>
{
    results = event.results[0][0].transcript;
    time = Date.now();
    document.querySelector('input#search').value = results;
};

let btn = document.createElement('button');
btn.title = 'Search by voice';
btn.style.cssText = `
    border: 0;
    margin: 0;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiM0Mjg1RjQiIGQ9Ik0xMiAxNWMxLjY2IDAgMi45OS0xLjM0IDIuOTktM0wxNSA1YzAtMS42Ni0xLjM0LTMtMy0zUzkgMy4zNCA5IDV2N2MwIDEuNjYgMS4zNCAzIDMgM3oiLz4KICAgIDxwYXRoIGZpbGw9IiMzNEE4NTMiIGQ9Ik0xMSAxOC45MmgyVjIyaC0yeiIvPgogICAgPHBhdGggZmlsbD0iI0Y0QjQwMCIgZD0iTTcgMTJINWMwIDEuOTMuNzggMy42OCAyLjA1IDQuOTVsMS40MS0xLjQxQzcuNTYgMTQuNjMgNyAxMy4zOCA3IDEyeiIvPgogICAgPHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTEyIDE3Yy0xLjM4IDAtMi42My0uNTYtMy41NC0xLjQ3bC0xLjQxIDEuNDFDOC4zMiAxOC4yMSAxMC4wNyAxOSAxMi4wMSAxOWMzLjg3IDAgNi45OC0zLjE0IDYuOTgtN2gtMmMwIDIuNzYtMi4yMyA1LTQuOTkgNXoiLz4KPC9zdmc+Cg==) no-repeat center;
    background-size: 24px 24px;
    bottom: 0;
    cursor: pointer;
    padding: 22px 12px 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 41px;
`;
btn.onclick = (ev) =>
{
    ev.preventDefault();

    if (recognizing) return;
    recognizing = true;

    results = undefined;
    time = Date.now();
    recognition.start();

    checkResults();
};

let checkResults = () =>
{
    let passed = Date.now() - time;
    if (results && passed > 500)
    {
        recognition.stop();
        return;
    }
    setTimeout(checkResults, 1000);
};

document.getElementById('search-input')
    .insertAdjacentElement('beforeend', btn);