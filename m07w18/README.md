# M07W18 - Data Fetching and Other Side Effects

### To Do

- [ ] Pure vs Side-Effects
- [ ] React Hooks
- [ ] The `useEffect` Hook
- [ ] Data Fetching Example(s)

### Video

[https://vimeo.com/883608144/53332cc4c0](https://vimeo.com/883608144/53332cc4c0)

### Pure Functions

Most of the programming we've looked at is considered "[procedural](https://en.wikipedia.org/wiki/Procedural_programming)." This is imperitive programming reliant on use of concepts like "variables," "blocks" and "scope." To give these blocks more utility, reserved words in such programming languages often include `if`, `while`, `for`, and more.

[Functional programming](https://en.wikipedia.org/wiki/Functional_programming), in contrast, focuses less on generic blocks and more on designing re-usable and modular functions. Many functional languages offer first-class functions, anonymous functions, and even closures. High-order functions are preferred to loops placed in a global context. Making use of these tools, a functional programmer aims to build their application using almost exclusively [pure functions](https://en.wikipedia.org/wiki/Pure_function).

What is a pure function? It is a function that abides by these two rules:

1. Identical return values if given identical arguments
2. No side-effects

Rule number two, in particular, might sound a bit mysterious. Let us unpack the definition of "side-effects" as they pertain to programming.

### Side-Effects

If the function mutates any variable or value outside of its own blocked scope, it would be said to have a side-effect. This includes the following cases:

- Performing standard input-output operations
- Updating the value of a variable defined outside of itself
- Mutating an argument passed by-reference
- Envoking a separate function that, itself, has side-effects

### Examples

This would be considered pure:

```JavaScript
// Given the same arguments, you will always receive the same result.
function sum(x, y) {
    return Number(x) + Number(y);
}
```

```JavaScript
function greeting(name) {
    return `Hello, ${name}!`;
}
```

These would be considered impure:

```JavaScript
let myNum = 1;

function addOneToNum() {
    myNum++; // Edits a globally-scoped variable.. impure!
    return myNum;
}
```

```JavaScript
function sum(x, y) {
    console.log(Number(x) + Number(y)); // I/O side-effect... impure!
}
```

## React Hooks

### What are Hooks?

In React, Hooks are functions that allow us to tap into select React features like **state**. We have already made use of one: `useState`! If you're curious about the complete list of Hooks available to use, check the official [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html).

### React Hook Rules

There are [rules](https://reactjs.org/docs/hooks-rules.html) we should follow when using React Hooks. There are two official ones:

1. Only call Hooks at the top level
2. Only call Hooks in React functions

Let's break these down.

#### 1. Only call Hooks at the top level

Never call Hooks within nested functions, in conditions, or inside of loops. The intention is for them to be placed before the return in a React function. This rule must be upheld to ensure state, or other Hook data, is maintained between renders.

#### 2. Only call Hooks in React functions

You may only call upon Hooks in your React function components, or in [building your own Custom Hooks](https://reactjs.org/docs/hooks-custom.html) (though that is a topic for another day.) The existing Hooks, as well as any you design, will begin with `use` as a prefix in its name; consider our use of React's [`useState`](https://reactjs.org/docs/hooks-state.html) Hook so far—and our focus today: [`useEffect`](https://reactjs.org/docs/hooks-effect.html).

## The `useEffect` Hook

### Side-Effects in React

We'd discussed how side-effects are defined in general when speaking about programming, but how do we see this play out in our React applications? A few of the most common side-effects you may encounter in React include:

- Timers
- Setting up a subscription
- Direct updates to the DOM
- Fetching data from an external resource
- Console logging

### Syntax

Alright, so if we need to perform an action that may be considered a side-effect, we should consider using the `useEffect` Hook. How do we use this Hook—what is it expecting from us?

The bare essential is calling the `useEffect` function and passing it a function as an argument that can be triggered after each render.

```JavaScript
// ...inside of a React component...

// Envoke React's useEffect Hook
useEffect(() => { // The first argument is a function

    // Your side-effect code here...

}); // If no second argument is present, the function will execute on every render.
```

It isn't always desirable to have your function execute on _every_ render. If this is not ideal for your use-case, consider adding the optional second argument: _dependencies_.

Let's review the two alternative approaches:

```JavaScript
// ...inside of a React component...

// Envoke the useEffect Hook as per usual
useEffect(() => { // Again, a function as the first argument

    // Your side-effect code here...

}, []); // An empty array as the second argument...

// An empty array as the second argument means that this side-effect function...
// will only execute at the end of the very FIRST render of this component.
// It will NOT run subsequent times as re-renders occur.
```

```JavaScript
// ...inside of a React component...

// Envoke the useEffect Hook as per usual
useEffect(() => { // Again, a function as the first argument

    // Your side-effect code here...

}, [props, state]); // An array containing prop and/or state data...

// If you pass one or more prop(s) and/or state(s) into the second argument array...
// your side effect function will run on the first render, and also any time a...
// change is detected in any of the respective prop(s) and/or state(s).
```

If you find your side-effect leaves some "garbage" lying around that may need cleaning up, this Hook gives us the opportunity to set up our own cleanup function as well. What are some cases in which we might want to unset something or clean a value up?

- Cancelling a timeout
- Retiring an interval
- Removing an event listener
- Terminating a socket connection

How do we set up our clean-up functions?

```JavaScript
// ...inside of a React component...

useEffect(() => {

    // Optionally, your function can return a clean-up function.
    return () => {}; // Include any clean-up steps in this returned function.

});
```

### The `useEffect` Hook Flow

It can be helpful to keep in mind React's order of operations when using this Hook. This will help you write your code with more intention and troubleshoot more swiftly if you receive unexpected output:

1. React Renders UI (JSX->HTML; DOM populated)
2. Browser Displays UI (DOM version of components shown in browser)
3. `useEffect` cleanups for previous effects are run
4. Current render effect functions are executed

Careful when updating dependencies inside of a `useEffect` as you may run into an endless loop!

## Examples

### Updating Non-React Controlled DOM

Here we'll create a basic component capable of updating our current browser tab's `title`.

```JavaScript
import { useState, useEffect } from 'react';

export default function TitleChanger() {
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Match the document's title to our state
        document.title = title;
    }, [title]); // Run side-effect every time "title" is updated

    return (
        <section>
            <h2>Page Title Changer</h2>
            <label>
                Enter a title for this page:
                <input
                    value={title}
                    onChange={(event) => {setTitle(event.target.value);}}
                >
            </label>
        </section>
    );
}
```

### Interval-Based Timer

When we make use of `setInterval` or `setTimeout`, we want to use `useEffect` to ensure these side-effects only occur on the first-render (otherwise subsequent runs may create more intervals or timeouts than desired.)

To avoid excessive memory use and prevent unexpected behaviour or errors, you'll want to clear an interval or timeout in the event the component is unmounted—include a clean-up function in your implementation for such cases.

```JavaScript
import { useState, useEffect } from 'react';

export default function IntervalCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {

        const countInterval = setInterval(() => {
            // Update state
            setCount((prev) => {
                return prev + 1;
            });
        }, 1000); // Repeat every 1000ms (1s)

        // Add clean-up function
        return () => {
            clearInterval(countInterval);
        };

    }, []); // Run side-effect on first render

    return <p>{count} seconds have passed.</p>;
}
```

### Ajax

Ajax is another great opportunity for practicing the `useEffect` Hook. Assuming we want to fetch some information from an API, we'll want to render our component straight away and begin the Ajax request. We only want the Ajax request to run once (on first render), and we'll use it to update our state with the appropriate data.

```JavaScript
import { useState, useEffect } from 'react';

export default function GhibliFilms() {
    const [requestStatus, setRequestStatus] = useState('loading');
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch('https://ghibliapi.herokuapp.com/films/')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setFilms(data);
                setRequestStatus('success');
            })
            .catch((error) => {
                setRequestStatus('error');
            });
    }, []); // Run on first render only

    const filmsListJSX = films.map((film) => {
        return(
            <li key={film.id}>
                <h3>{film.title} ({film.original_title})</h3>
                <p>
                    <img
                        src={film.image}
                        style="max-width: 100px; float: left;"
                    />
                    {film.description}
                </p>
                <dl>
                    <dt>Romanised Title</dt><dd>{film.original_title_romanised}</dd>
                    <dt>Director</dt><dd>{film.director}</dd>
                    <dt>Producer</dt><dd>{film.producer}</dd>
                    <dt>Release Date</dt><dd>{film.release_date}</dd>
                    <dt>Running Time</dt><dd>{film.running_time}</dd>
                    <dt>Score (Rotten Tomatoes)</dt><dd>{film.rt_score}</dd>
                </dl>
            </li>
        );
    });

    return (
        <section>
            <h2>Ghibli Films List (from API)</h2>
            {requestStatus === 'loading' && <p>Loading films...</p>}
            {requestStatus === 'error' && <p>An error was encountered; please try again.</p>}
            {films.length > 0 && <ul>{filmsListJSX}</ul>}
        </section>
    );
}
```

## Resources

- [Pure function](https://en.wikipedia.org/wiki/Pure_function)
- [Side effect](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>)
- [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html) / [React `useEffect` Hooks](https://www.w3schools.com/react/react_useeffect.asp)
- [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
- [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Axios (promise-based HTTP client for both browser and server)](https://axios-http.com/)
