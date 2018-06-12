# Exam 1

* Create a feature-branch named `exam1`
* Modify the questions.md file to add answers to each question *Important!  Separate file!*
* Create the files needed to complete the rest of the assignment listed below, creating those files in this directory and subdirectories as needed.
* Create a Pull Request (PR) to merge your exam1 branch in to your master branch, and assign that PR to me.
* Create the pull request by the start of next class

# Exam 1 Coding

* Create an express server (server.js)
    * that listens on port 3000
    * that serves up a static index.html from a "public" subdirectory
* Include the package.json that lists all the dependencies such that `npm install` will install them
* Have the index.html contain a button with class name `exam1-button`
* Have the index.html contain an unordered list with class name `button-list`
* The button-list list will be horizontally centered on the page using CSS flexbox
* Clicking the `exam1-button` will add a button to the button-list list each time it is clicked
* The first button added will have the text "1", the second button added will have the text "2", and so forth
* Clicking any of the buttons in the button-list list will remove the button from the list
* Clicking any of the buttons will send a GET call to a /report endpoint on the server
    * That will pass the number of the button as query param "button" (e.g. button=3)
    * The server will console.log the message ("Button X was pressed" where X is the number)

Allowances:
* You may create any additional HTML structures needed
* You may assign any additional CSS classes needed

Particular requirements:
* Do not use CSS float
* Do not use position: absolute
* Do not use inline CSS
* Do not use inline JS
* Only add event listeners using addEventListener
* Be sure to use lowercase filenames
* Be sure to use camelCase JS variable names
* Be sure to use kebab-case CSS class names
* Be sure to have clean, readable files
* Do not create JS variables in the global scope
* Do not have browser console messages or warnings
* Do not include node_modules in your PR
* Do not include IDE or other outside files in your PR 
* Be sure to assign the PR to me

