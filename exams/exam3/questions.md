# Exam 3 Questions

Answers should be roughly 2-5 sentences/lines of code.  Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.

## Q: If a Single Page Application is HTML with JS that updates the HTML in-place, how would a multiple-page application that does NO dynamic HTML replacement work?
We can use React and set states of the App. Every time states change the App will change. And we can render different components instead of dynamic HTML replacement.

## Q: Give a code snippet that will console.log the phrase "Hello World" using lexical scoping
const myFunction = function () {
  const phrase = 'Hello World';
  const myOtherFunction = function () {
    console.log(phrase);
  };
  myOtherFunction();
};

## Q: Using Create React App, you can run `npm build` to generate an HTML file and a JS file.  What do you do with these files to make an actual website with them?
Move the files required for your component into their own folder and then run react.build and publish your new lib. react.build runs babel on a directory, runs a transpiler on js files and copys over every other file in the folder(css and static files)

## Q: Client-side coding pretty much requires Javascript, but server-side coding can be done in many languages, not just JS.  Why does the browser not have problems if the server side code is written in, for example, Python?
Because server-side coding does not need to work on how to create or modify a HTML page. It focuses on handling service calls and data which all languages can finish.

## Q: If a Single Page Application is making use of service calls, must those services run on the same domain and port?  Why/Why not?
No. Different domains or ports have different meaning.  

## Q: I've often said that it is better to have "dumb" components or functions.  What do I mean by "dumb", and why is "dumb" better?
Dumb components are also called ‘presentational’ components because their only responsibility is to present something to the DOM. It is better because once they are done, we do not need to take care of them any more if we just work on logic and data outside the compo and functions.

## Q: React Components can each have their own state.  What decides if a component should or should not have it's own state?
First, we need to consider where is the data from.(if it is from father component) And we need to know if the data will change or just immutable. Then we decide if we store the data in state.

## Q: Give an example HTTP request below using only the URL requested (/example/url.html) and the headers of Date and Content-Type with reasonable values, and a body that is the stringified JSON object { hello: "world"}
return fetch('/example/url.html', {
  method: "POST",
  body: JSON.stringify({ hello: "world"}),
  headers: new Headers({ 'content-type': 'application/json'}),
})

## Q: When a warning message about CORS mentions an "opaque" response, what does that mean?
Some requests can be read in JavaScript if the server returns CORS headers, but a number of sites will not do this. In service workers you can make requests to third-parties and cache the responses. For opaque responses the contents of the Response will still be hidden. You can’t even check that status code of the response. Because of this Workbox treats opaque responses differently.

## Q: "Once you go async, you must stay async" - When talking about the results of an async call, what does this mean?
Synchronous and asynchronous transmissions are two different methods of transmission synchronization. Synchronous transmissions are synchronized by an external clock, while asynchronous transmissions are synchronized by special signals along the transmission medium.
