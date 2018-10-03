
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


document.getElementById('search-input')
    .insertAdjacentElement('beforeend', btn);


let textEl;
let animatingListener = false;

let removeListenerOverlay = () =>
{
    document.body.style.removeProperty('overflow');
    document.getElementById('-listenerOverlay').remove();
};

let appendListenerOverlay = () =>
{
    document.body.style.overflow = 'hidden';
    document.body.insertAdjacentHTML('beforeend', `
        <div id="-listenerOverlay" style="position: fixed;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: white;
            display: flex;">
            <div id="-listenerOverlayText" style="flex: 1;
            font-size: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;">
                <p>Listening...</p>
            </div>
            <div class="-listenerOverlayIcon" style="flex: 1; 
            display: flex;">
                <div class="-listenerOverlayIconWrap" style="position:absolute; right: 70px; top: 30%;">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4IiB2aWV3Qm94PSIwIDAgNDg0LjUgNDg0LjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4NC41IDQ4NC41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGcgaWQ9ImtleWJvYXJkLXZvaWNlIj4KCQk8cGF0aCBkPSJNMjQyLjI1LDMwNmM0My4zNSwwLDc2LjUtMzMuMTUsNzYuNS03Ni41di0xNTNjMC00My4zNS0zMy4xNS03Ni41LTc2LjUtNzYuNWMtNDMuMzUsMC03Ni41LDMzLjE1LTc2LjUsNzYuNXYxNTMgICAgQzE2NS43NSwyNzIuODUsMTk4LjksMzA2LDI0Mi4yNSwzMDZ6IE0zNzcuNCwyMjkuNWMwLDc2LjUtNjMuNzUsMTMwLjA1LTEzNS4xNSwxMzAuMDVjLTcxLjQsMC0xMzUuMTUtNTMuNTUtMTM1LjE1LTEzMC4wNUg2My43NSAgICBjMCw4Ni43LDY4Ljg1LDE1OC4xLDE1MywxNzAuODV2ODQuMTVoNTF2LTg0LjE1Yzg0LjE1LTEyLjc1LDE1My04NC4xNDksMTUzLTE3MC44NUgzNzcuNEwzNzcuNCwyMjkuNXoiIGZpbGw9IiM2NjY2NjYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" style="    position: relative;
                                                    width: 100px;
                                                    z-index: 1;
                                                    right: 98px;
                                                    top: 103px;" />
                    <div id="-listenerOverlayIconBack" style="background-color: #dbdbdb;
    border-radius: 100%;
    display: inline-block;
    height: 301px;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    width: 301px;
    transition: opacity 0.218s;
    transform: scale(.01);
    top: 0;
    right: 0;"></div>
                </div>

            </div>
        </div>
    `);

    textEl = document.querySelector('#-listenerOverlayText p');

};

let setListenerText = (text) =>
{
    textEl.innerText = text;
};

let animateListener = () =>
{
    let el = document.getElementById('-listenerOverlayIconBack');
    if (!el) return;

    let a = .5 + .55 * Math.random()
        , b = Math.round(70 + 10 * Math.random());
    el.style.setProperty("-webkit-transition", "-webkit-transform " + b / 1E3 + "s ease-in-out");
    el.style.setProperty("-webkit-transform", "scale(" + a + ")");
    setTimeout(animateListener, 150);
};


document.addEventListener('keyup', (evt) =>
{
    if (evt.key === 'Escape')
        removeListenerOverlay();
});


