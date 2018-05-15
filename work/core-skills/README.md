# Core skills

* Create a feature branch named `core-skills`
* Create the below files in the same directory as this files as part of that feature branch
* Note: no need for a server, just static files
* Submit a PR to merge that feature branch to master, and _assign the PR to me_

## HTML

* Create a file `core.html`
* That file should load `core.css` and `core.js` 
* `core.html` should have a div with a button labeled "Even" and a button labeled "by 5"
* `core.html` will have an empty div below the buttons and above the list (see next line)  
* `core.html` should have an empty unordered list
* `core.html` should have a div with the text "Loading..."
* You may (and should) add classes to any of your elements, but do not use any "id"s

## CSS

* Create a file `core.css`
* This file can use selectors to target classes and tags and any combination thereof, but should not target any ids
* This file should have the needed rules to allow the page to function (see How it Works below)
* All color choices are approximate - where this says "light blue" you can choose any particular color that counts as light blue

## J


* Create a file `core.js`
* This file should be wrapped in an IIFE and leak nothing to the global variable scope
* This file should not have any console statements (you can use them to develop, but remove them before submitting)
* When the page loads, this file should fill the empty unordered list in the HTML with the numbers 1 through 99
* When the page loads, this file should hide or remove the "Loading..." message
* When the page loads, this file should add event listeners to allow the page to function (see How it Works below)
* Keep your JS clean and with small, clear functions

## How it Works

It works when core.html is opened in Chrome (File--Open File)

At first the numbers are listed in boxes that are 20px wide and 20px high with a 1px black border and 2px between the boxes.  The boxes run right-to-left and wrap to lower lines as needed to fit the screen.  The page will have a light blue background, and each numbered box will have a pale green background.

When the "Even" button is clicked, all even numbered boxes will switch to a light red/pink background.  If the Even button is clicked again, the boxes will lose the light-red color.

When the "by 5" button is clicked, all boxes with numbers evenly divisible by 5 (e.g. 5, 10, 15, etc) will get a light purple.  If the By 5 button is clicked again, the boxes will lose the light purple color.

If a box would be both light-red AND light-purple, instead leave it as pale-green but change the border color to red. 

If a numbered box is clicked, the font-size of the number will increase.  Clicking it again will decrease it.

If a numbered box is clicked, the number will appear in the empty div.  Nothing clears this (except reloading the page), and as more numbers are clicked the list (non-html list) of nubmers will grow longer.  Each number added will be in a `<span>` tag.  These numbers are in the order they are clicked.  No number will appear here more than once (clicking on a numbered box multiple times will repeatedly change the font size as above, but will only add the number to the list of spans on the first click.

## Hints

* A listener will pass an event object to the callback function.  event.target refers to the element that received the event.  This means you can listen on a parent/ancestor element for events on decendants.  
* Achieving styling changes is usually done by adding/removing classes from elements.  Search `MDN classlist` to see useful methods on the classlist property of an element.
* Do _not_ use inline styles.  This also means do not assign styles directly in JS.  Add or remove classes.
* The remainder/modulo operator is very useful to determine if a number is evenly divisible by anything.  See `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()`
