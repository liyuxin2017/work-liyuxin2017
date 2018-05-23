# Basic Chat

* Create a feature branch named `basic-chat`
* Modify the files in this directory and the public/ subdirectory as directed below
* None of the requirements persist any stored information beyond restarting the server.   If you restart the server, everything done since the server started is lost.
* Make sure to complete ALL the requirements listed here.
* Submit a PR to merge that feature branch to master, and _assign the PR to me_

## Polling

Add code to the chat.js that will make a GET request to the /messages roughly every 3 seconds.  Use the results to update the displayed messages. This is working when you can have two tabs loading the chat.html that are able to send messages and each will see both their messages and the messages of the other.  This polling will not happen while the user is not logged in (see below).

## Login

Add code to the server.js to create a POST endpoint /login.  The client will send a username (no password, just the username) to this endpoint using an object encoded as JSON.  The server will add the user to the list of logged on users.  If the user is already on the list, the user will NOT appear twice.  This endpoint will return the list of users via JSON.

Modify the client-side chat.js and chat.html so that when the page is loaded the user will see:
* A div that uses `position: absolute` to be near the center of the screen.  This div will have a clearly visible border.  This div will have a label tag.  Inside the Label tag will be the text "Username:" and an input tag.  (You may add additional tags, just make sure the label tag contains the input tag).  This div also has a button with the text "Login".  
* The Login button will be disabled ( have the HTML property 'disabled') if the input tag is empty.  When they add text the disabled property is removed.  If they delete all the text, the button is once again disabled.  (Hint: deleting is done by keypress, so you can check the length of the value after each keypress)
* When the user has entered a username and clicked Login OR pressed Enter, the username and login button will not be visible (you may remove the HTML, or just hide it with CSS, your choice).  Instead, the text "Loading" will appear.  The Chat.js will make a POST request to the login/ endpoint and remember the id number returned.  When the response has come back, this div will be removed entirely.
* While the user is not logged in, the Send button will be disabled.  
* While the user is not logged in, the new messsage input box will be disabled.

## Logout

Add a Logout button to the page.  You decide where it appears.
* When the logout button is clicked, chat.js will send a DELETE request to the /login endpoint, sending the username via JSON.  The login div will once take effect and the page behavior will be the same as if the user never logged in.

Add the ability to handle DELETE calls to the /login endpoint (Hint: `app.del` instead of `app.delete`).  When this is called the server will remove the username passed via JSON from the user list.  This call will return the new list of users.

## GET Messages

Modify the GET /messages endpoint to return (via JSON) both the list of messages AND the list of users. (Hint: an object with a messages key and a users key will do the trick)

Modify the chat.js to handle this changed format.

## User List

Add a div to the left side of the screen that shows the list of users.  This will show any new users added after the user logs in.  (Hint: You are already polling to get messages, and the messages endpoint also gives the list of users)

## Sending
* Whenever the new message input is empty, the Send button is disabled.  This includes when the input box is blanked after sending a message.
* Messages will send using the username the user is logged in as, not 'Me'

## Message Display
* The users own messages will be shown in light grey color while the messages of other users are in black
* Add styling to chat.css to improve the listing of messages
* Use the CSS overflow property (and other properties) to set it so that if there are too many messages to fit on the screen they scroll while the new message area will always be on screen
* You may add additional styling to improve the appearance.

## Special requirements
* Keep your functions small
* Keep your functions focused
* Reuse functions where you can
* Do not read data from the HTML other than from the input boxes
* Do not use id properties
* Do not use inline JS
* Do not use inline CSS
