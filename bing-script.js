// ==UserScript==
// @name         Updte Bing Chat Enterprise Character Limit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Modify maxlength of a field in shadow root
// @author       Arjun Bery
// @match        https://www.bing.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/arjunrbery/bing-chat-update-length/main/bing-script.js
// @downloadURL  https://raw.githubusercontent.com/arjunrbery/bing-chat-update-length/main/bing-script.js
// ==/UserScript==

(function() {
    'use strict';

    const shadowRootObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const Serp = document.querySelector('cib-serp').shadowRoot;
                if (!Serp) {return}
                const actionBar = Serp.querySelector('cib-action-bar').shadowRoot;
                if (!actionBar) {return}
                const textInput = actionBar.querySelector('cib-text-input').shadowRoot;
                if (!textInput) {return}
                const field = textInput.querySelector('#searchbox');
                if (field) {
                    field.setAttribute('maxlength', '25000');
                    console.log('Maxlength updated');
                    shadowRootObserver.disconnect();
                }
            }
        });
    });

    shadowRootObserver.observe(document.body, { childList: true, subtree: true });
})();
