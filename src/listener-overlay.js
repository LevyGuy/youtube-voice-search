
let textEl;

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
                <p></p>
            </div>
            <div class="-listenerOverlayIcon" style="flex: 1; 
            display: flex;">
                <div class="-listenerOverlayIconWrap" style="position:absolute; right: 70px; top: 30%;">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4IiB2aWV3Qm94PSIwIDAgNDg0LjUgNDg0LjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4NC41IDQ4NC41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGcgaWQ9ImtleWJvYXJkLXZvaWNlIj4KCQk8cGF0aCBkPSJNMjQyLjI1LDMwNmM0My4zNSwwLDc2LjUtMzMuMTUsNzYuNS03Ni41di0xNTNjMC00My4zNS0zMy4xNS03Ni41LTc2LjUtNzYuNWMtNDMuMzUsMC03Ni41LDMzLjE1LTc2LjUsNzYuNXYxNTMgICAgQzE2NS43NSwyNzIuODUsMTk4LjksMzA2LDI0Mi4yNSwzMDZ6IE0zNzcuNCwyMjkuNWMwLDc2LjUtNjMuNzUsMTMwLjA1LTEzNS4xNSwxMzAuMDVjLTcxLjQsMC0xMzUuMTUtNTMuNTUtMTM1LjE1LTEzMC4wNUg2My43NSAgICBjMCw4Ni43LDY4Ljg1LDE1OC4xLDE1MywxNzAuODV2ODQuMTVoNTF2LTg0LjE1Yzg0LjE1LTEyLjc1LDE1My04NC4xNDksMTUzLTE3MC44NUgzNzcuNEwzNzcuNCwyMjkuNXoiIGZpbGw9IiM2NjY2NjYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" style="    position: relative;
    z-index: 1;
    right: 86px;
    top: 88px;" />
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
    animateListener();
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
}
