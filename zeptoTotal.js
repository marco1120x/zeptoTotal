// ==UserScript==
// @name         Zepto Beta Script
// @namespace    http://tampermonkey.net/
// @version      2024-05-21
// @description  try to take over the world!
// @author       You
// @include    *://*.google*/search*
// @include    *://*.zepto*
// @include    *://**
// @match        https://www.google.com/search?q=tampermonkey+firefox&client=firefox-b-d&sca_esv=cb047ac22b9af92a&ei=v59MZqm5EK7h4-EPt4mGiAY&oq=tampermonkey+&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXRhbXBlcm1vbmtleSAqAggBMgsQABiABBixAxiDATIKEAAYgAQYQxiKBTIQEAAYgAQYsQMYQxiDARiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIFEAAYgAQyBRAAGIAEMgUQABiABEinFFDsB1jsB3ABeACQAQCYAWCgAbgBqgEBMrgBAcgBAPgBAZgCAqACX8ICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFmAMAiAYBkAYKkgcBMqAHlgs&sclient=gws-wiz-serp
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("script ran");

    //setTimeout(console.log('total',total), 3000);
    //      document.querySelectorAll('button').forEach(button => {
    //             button.addEventListener('click', calc);
    //          console.log("button clicked");
    //         });
    //calc(event);

    //      document.addEventListener('DOMContentLoaded', function() {
    //             // Add a click event listener to the document to capture button clicks
    //             document.addEventListener('click', calc);
    //         });

    // Create a new button element
    var button = document.createElement('button');



    // Set button text
    button.textContent = 'Calc total';

    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.left = '20px';
    button.style.zIndex = '9999';
    button.style.border = '2px';
    button.style.background = 'red';

    // Append the button to the body of the document
    // for now this button is not required
    //document.body.appendChild(button);

    // Add event listener to the button
    button.addEventListener('click', function() {
        console.log('Button clicked!');
        // Add more actions here based on button click
    });

    document.addEventListener('click', calc);
})();

function calc(){
    setTimeout(() => {

        const anchorTags = document.querySelectorAll('a');
        let total = 0;

        anchorTags.forEach(anchor => {
            if (anchor.href.includes('order')) {
                const pTags = anchor.querySelectorAll('p');
                if (pTags.length > 1) {
                    const valueText = pTags[1].textContent.trim();
                    const valueWithoutDollar = valueText.replace('₹', '');
                    const valueAsNumber = parseFloat(valueWithoutDollar);

                    if (!isNaN(valueAsNumber)) {
                        total += valueAsNumber;
                    }
                }
            }
        });
        console.log('Total:', total);

        console.log("Delayed for 3 second. ");
        if(total != 0){
            alert('Total amount spend : '+ total)
        }
    }, "3000");
}
