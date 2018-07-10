# Exam 2

* Create a feature-branch named `exam2``
* Create the files needed to complete the rest of the assignment listed below, creating those files in this directory and subdirectories as needed.
* Create a Pull Request (PR) to merge your exam2 branch in to your master branch, and assign that PR to me.
* Create the pull request by the start of next class
* There is no Q&A section for this exam, just the coding.

# Exam 2 Coding

*IMPORTANT* Do not use any additional libraries beyond those we have used in class.  No Bootstrap, no coding libraries, nothing.  EXCEPTION: You may use an animated image (only - no code unless it is a CSS snippet) to indicated waiting as described below.  Be sure to note where any images came from and that you have permission to use it.

* Create an express server (server.js) to host service calls, and a create-react-project to host the front end
* Create a React application that does the following:
* A user loading the page will see a login prompt, asking for a username (There is no authentication, just a name)
* When the user provides a username, the page will make a POST call to a /login service endpoint, and based on the response will do the following:
    * If the user is not in a game (the normal default), the user is presented with a list of open games as well as the option to make a game (see below).
    * If the user is in a game, the user is presented with the game in-progress and can continue playing.   (This likely only happens if you reload the page while in a game)
* A user that elects to create a game will provide a game name.  The page will POST that name and the player name to the server at the /game/${gameName} endpoint.  If the name is already in use an error will occur and the player will be able to change the game name.  Once the game name is successfully submitted the page will display a wait screen.  On the wait screen there will be some indication of waiting (a spinning icon, progressing dots, something) and the page will poll a GET /game/${gameName} endpoint waiting for another player to join the game.
* When a player joins an existing game, the two players of that game (which are both polling) will be presented with an empty tic-tac-toe game.  The creating player will be prompted to go first (as 'X'), while the other player will see a "waiting on other player" message.
* Each player will have 10 seconds to take their turn, or they lose the game.
* Each player is prevented by the client from making an invalid move.  The client will not send an invalid move to the server.
* The server will not allow an invalid move, even though the client shouldn't send them.
* Moves are sent to the PUT /game/${gameName} endpoint
* When a game is won (or conceeded) the server will not accept further moves for that gameName
* When a game is won (or conceeded) the client will show a final result screen with the gameboard and who is the winner.  The player can then choose to join an existing game or create a new one (whether this involves another screen or is on the same screen is up to you).
* A user can always logout, which sends a DELETE call to a /login/ endpoint.  Any games that are in-progress for that user are conceeded and the other player is informed.  Any games that are waiting for another player to join that the logging out player create are deleted.


Allowances:
* You may create any additional HTML structures needed
* You may assign any additional CSS classes needed
* It is okay to have small deviations in timing ( a 10 second turn that takes 10.1 seconds, for example)

Particular requirements:
* The page does not need to look good, but some basic styling should be applied - enough to show how a more involved appearance would be added, and to be user-friendly in terms of what can/cannot be interacted with.
* Do not use CSS float
* Do not use position: absolute
* Do not use inline CSS
* Do not use inline JS
* Do not interact with the DOM directly
* Do not use JSX ref unless I explicitly okay it
* Have a separate JSX file for each component
* The server should NEVER trust the client (except for user login)
* All service call errors should be handled
* Be sure to catch errors on all your service calls in a USEFUL way
* Be sure to use camelCase JS variable names
* Be sure to use kebab-case CSS class names
* Be sure to have clean, readable files
* Do not have browser console messages or warnings
* Do not include node_modules in your PR
* Do not include IDE or other outside files in your PR 
* Be sure to assign the PR to me
