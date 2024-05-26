// ==UserScript==
// @name         Zepto Beta Script
// @namespace    http://tampermonkey.net/
// @version      2024-05-21
// @description  try to take over the world!
// @author       You
// @include    *://*.zepto*
// @match        https://www.google.com/search?q=tampermonkey+firefox&client=firefox-b-d&sca_esv=cb047ac22b9af92a&ei=v59MZqm5EK7h4-EPt4mGiAY&oq=tampermonkey+&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXRhbXBlcm1vbmtleSAqAggBMgsQABiABBixAxiDATIKEAAYgAQYQxiKBTIQEAAYgAQYsQMYQxiDARiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIFEAAYgAQyBRAAGIAEMgUQABiABEinFFDsB1jsB3ABeACQAQCYAWCgAbgBqgEBMrgBAcgBAPgBAZgCAqACX8ICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFmAMAiAYBkAYKkgcBMqAHlgs&sclient=gws-wiz-serp
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...
    buttonNotFound = 0
    console.log("script ran",buttonNotFound);

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
    button.textContent = 'Calculate Total Spending';

    button.style.position = 'sticky';
    //     button.style.top = '64px';
    //     button.style.left = '65px';
    button.style.zIndex = '9999';
    button.style.border = '2px';
    button.style.background = 'red';
    button.style.padding = '3px';


    // Append the button to the body of the document
    // for now this button is not required
    //document.body.appendChild(button);
    document.body.insertBefore(button, document.body.firstChild);

    // Create the progress bar element
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.style.height = '30px';
    progressBar.style.backgroundColor = '#4caf50';
    progressBar.style.width = '0%';
    progressBar.style.borderRadius = '5px';

    // Create the progress container element
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress-container');
    progressContainer.style.width = '50%';
    progressContainer.style.backgroundColor = '#f5f5f5';
    progressContainer.style.border = '1px solid #ccc';
    progressContainer.style.borderRadius = '5px';
    progressContainer.style.margin = '20px auto';
    progressContainer.appendChild(progressBar);

    progressBar.style.display = 'none';
    progressContainer.style.display = 'none';

    // Append the progress container to the body
    document.body.appendChild(progressContainer);
    //document.body.insertBefore(progressContainer, document.body.firstChild);
    //const button = document.querySelector('button');
    button.parentNode.insertBefore(progressBar, button.nextSibling);
    // Add event listener to the button
    button.addEventListener('click', function() {
        console.log('Button clicked!');
        const profile = document.querySelector('a[aria-label="profile"]');
        if (profile) {
            profile.click();
        } else {
            console.log("No elements found with the aria-label 'Profile'.");

        }
        // Add more actions here based on button click
        shouldStop = false;
        infiniteLoopWithDelay()

        progressBarFunc()


        // timeout is added cause progressBar addition to DOM will take some time
        setTimeout(() => {
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.display = 'block';
            const progressContainer = document.querySelector('.progress-container');
            progressContainer.style.display = 'block';
        }, "100");
    });
    // document.addEventListener('click', calc);

    console.log("script ran end",buttonNotFound);
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

        console.log("Delayed for 1 second. ");
        const options = { style: 'decimal', useGrouping: true, notation: 'standard', compactDisplay: 'long' };
        const formattedNumber = total.toLocaleString('en-IN', options);

        // commenting alert box for now
        if(total != 0){
            alert('Total amount spend : ₹'+ formattedNumber);
        }
        // progressBar is not required as results are out
        resultsOut = true
        setTimeout(() => {
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.display = 'none';
            const progressContainer = document.querySelector('.progress-container');
            progressContainer.style.display = 'none';
        }, "10");

    }, "10");
}

function loadMore(){
    console.log("loadMore Called")
    const button = document.querySelector('button[aria-label="Load More"]');

    // Check if the button exists
    if (button) {
        // Programmatically click the button
        button.click();
    } else {
        console.error('Button not found');
        buttonNotFound = buttonNotFound + 1;
    }
    if(buttonNotFound > 3){
        stopInfiniteLoop()
        calc()
    }

}
function startInterval(){
    console.log("start interval called")
    var intId
    intId = setInterval(loadMore, 1000);
    if(buttonNotFound < 3){
        clearInterval(intId)
    }
    console.log("start interval end ",intId)
}

function infiniteLoopWithDelay() {
    function loop() {
        if (shouldStop || resultsOut) {
            console.log('Loop has been stopped');
            return; // Exit the loop if shouldStop is true
        }
        console.log('This message will print every second indefinitely');
        loadMore()
        setTimeout(loop, 1000);
    }

    // Start the loop
    loop();
}

function stopInfiniteLoop() {
    shouldStop = true;
}

function progressBarFunc(){

    var shouldStopProgress = false
    const progressBar = document.querySelector('.progress-bar');

    const progressContainer = document.querySelector('.progress-container');

    // Function to start the progress
    function startProgress() {
        console.log("start progress called")
        let width = 0;

        function frame() {
            console.log("frame called")
            if (width >= 100) {
                shouldStopProgress = true
                //clearInterval(intervalId);
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }
        function infiniteLoopProgressBar() {
            function loop1() {
                if (shouldStopProgress || resultsOut) {
                    console.log('Loop has been stopped');
                    return; // Exit the loop if shouldStop is true
                }
                console.log('filling progress infinitely');
                frame()
                setTimeout(loop1, 1000);
            }

            // Start the loop
            loop1();
        }
        infiniteLoopProgressBar()
        //setInterval(frame, 100);
    }
    setTimeout(() => {
        startProgress()
    }, "10");


}


var shouldStop = false;
var buttonNotFound
var resultsOut = false;
