# Exam 1 Questions

Answers should be roughly 2-5 sentences.  Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.

## Q: What is the difference between a dynamic asset and a static asset?
When the request is sent to the server by the client, a static asset will be fetched by the server directly without being modified while a dynamic asset will response according to the request and generate the content that the request needs and then send the content back. We can interact with the web server through a dynamic asset.

## Q: What is the difference between a relative and absolute path?
An absolute path points to the exact location in the file system, regardless of the current working directory. It contains a full file directory path including the root directory. A relative path does not need the full file directory, which starts from the current working directory.

## Q: What is the difference between server-side and client-side JS?
Server-side JS deals with things like I/O request including connection with databases and file systems, messages communication, etc. Client-side JS enables the enhancement and manipulation of web pages and client browsers by DOM and BOM.

## Q: Why might we use an IIFE?
First the function will execute once it has been created. The point is that we can avoid polluting the global namespace by using an IIFE because all variables inside the IIFE are invisible outside the function.

## Q: What are the differences between `var`, `const`, and `let`?
`const` means that the identifier can’t be reassigned and must be initialized. Its scope is block.
`var` means that the identifier can be reassigned and the scope is function.
`let` means tha the identifier can be reassigned and the scope is block.

## Q: What are the 4 ways to create inheritence (no examples needed, just a sentence each)?
Brute Force: this way uses function Object.setPrototypeOf(object, prototype) to create inheritence.
Constructor Function: a constructor function is a function that runs at the creation of an object. Constructor functions will also set any object named "prototype" on that function (by default an empty object) to be the prototype for the newly created object.
Object.create(): It gives you a new object with the passed object as the prototype (or no prototype if you pass null).
ES6 Class syntax: ES6 has the new reserved keyword Class with a constructor statement. The new syntax gives us a dedicated constructor statement that runs on object creation. Constructors are helpful for any object initialization logic.

## Q: Give a demonstration of 1 way to create JS inheritence to inherit a method named "purr".
class Example {
  constructor() {
  }
  purr() {
  }
}
const foo = new Example();
foo.purr();

## Q: Give a demonstration of a different way to create JS inheritence to inherit a method named "hiss".
const basis = { hiss: () => {} };
const instance = Object.create(basis);
instance.hiss();

## Q: What does it mean that the HTTP Protocol is "stateless"?
It means that the connection between the browser and the server is lost once the transaction ends.
