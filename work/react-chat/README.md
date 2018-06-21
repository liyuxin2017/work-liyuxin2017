# React Chat

* Create a feature branch named `react-chat`
* Create a create-react-app to be THIS DIRECTORY (you will need to copy this file and server.js then destroy this directory before running create-react-app, or run create-react-app and copy the files/directories created to here).  Do NOT create an app that is entirely a subdirectory of this one.
* Create a server.js file in this directory and use the "proxy" property in the package.json to all the react app to get to that server when running locally.
* None of the requirements persist any stored information beyond restarting the server.   If you restart the server, everything done since the server started is lost.
* Make sure to complete ALL the requirements listed here.
* Submit a PR to merge that feature branch to master, and _assign the PR to me_

Here are the required chat features:

## Login

The user will have to login before they can send/get messages.  The App will keep the username client-side, and will send the login name to the server as a POST action to a /login endpoint.  The server will use this to maintain a list of current users.  The username will also be sent when each message is sent.  The user will not see an option to login if they are logged in, but will see an option to logout.

## Logout

A DELETE call to the /login endpoint will send the username, and the server will remove that username from the list of active users.  The client will not allow the user to see or send new messages until the user has once again logged in.  The user will not see an option to logout if they are logged out, but will see an option to login.

## Polling

Every 3 seconds (while logged in) the app will make a GET request to /messages and update the listed messages and the user list as needed.  Polling will stop when the user logs out and will start when the user logs in.

## User List

When the user is logged in, they can see the list of logged in users, including themselves.  This list updates as part of the polling process.

## Sending
* Whenever the new message input is empty, the Send button is disabled.  This includes when the input box is blanked after sending a message.
* Messages will send using the username the user is logged in as
* Messages are sent (if there is a message) when the Send button is clicked OR "Enter" is pressed in the message input
* When a message is sent the message input area is set to ''
* When a user logs out, the message input area is set to ''

## Message Display
* The users own messages will be shown in different color than messages of other users.
* Add styling to make the application a usable level of attractive and understandable
* Use the CSS overflow property (and other properties) to set it so that if there are too many messages to fit on the screen they scroll while the new message area will always be on screen
* You may add additional styling to improve the appearance.

## Error messages
* Inform the user onscreen (without using alert()!) of any errors talking with services
* The app should remain usable after an error, though the user may have to repeat an action

## Special requirements
* Keep your functions small
* Keep your functions focused
* Reuse functions where you can
* Keep your non-JSX logic out of the JSX components: put it in separate JS files you import from
* One component per JSX file
* Use MixedCase.jsx style for JSX files, camelCase.js for JS files
* Do not use Component "ref" property (you would know if you were doing so)
* Do not read data from the HTML other than from the input boxes
* Do not use id properties
* Do not interact with the DOM - use React only to read/write/modify the experience

