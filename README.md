# RoundJS

<small>... Because it's a minimal and bad substitute for Angular.</small>

---

## Intro

Two-classes abstraction over native Web Components API.

This is basically Vanilla JS. It only provides:

- Reactive state with the `this.defineState()` method

> This is now done with a cheap implementation of "virtual DOM" and DOM diffing 🙌

- Attributes passed as "props" (`:attr` syntax) can be automatically accessed via `this.attr`
- Observable-like object to share state between components (`Streams`)
- Templating syntax based on tagged template strings. This allows us to do things more similarly to JSX and even attach event listeners inline (`@click` etc.)

For the rest, just use JavaScript.

A quick look to the code must be enough to notice this, but just in case: **NOT READY FOR PRODUCTION, PROBABLY WON'T BE AND WHY WOULD YOU NEED YET ANOTHER LIBRARY**.

This is just a side project made for fun, for my own edification. I intend to build examples and find more common pain points I'd like to address, so the API will change.

_Nonetheless_, I'm always open to feedback. As soon as I have the docs ready and I feel that I've maxed out my own improvement capabilities, I'll even accept PRs if anyone is interested in contributing. Let's learn together 🙂.

## Upcoming

Things I'm planning to address in the following weeks:

- [ ] Write docs with the current status
- [ ] Add type annotations
- [ ] Build stuff and take notes about things I'd like to address
- [ ] Write tests
- [ ] DOM diffing
  - [x] Automatic render of virtual dom
  - [x] Diffing will update only the parts of the DOM that have actually changed
  - [x] Diffing capabilities when element has shadow root
  - [ ] Promisify DOM updates
  - [ ] Take custom elements' children out of the diff tree, as they should handle their own children
- [x] Add "template engine" with the help of [htm](https://github.com/developit/htm)
- [x] Attach event listeners with `@event` directive

Thanks for reading 🙂
