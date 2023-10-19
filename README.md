# RoundJS

<small>... Because it's a minimal and bad substitute for Angular.</small>

---

## Intro

Two-classes abstraction over native Web Components API.

This is basically Vanilla JS. Even the "templating" is vanilla (mere template strings). It only provides:

- Reactive state with the `this.defineState()` method
- Attributes passed as "props" can be automatically accessed via `this.data_whatever`
- Observable-like object to share state between components (`Streams`)

For the rest, just use JavaScript. Even attaching event listeners must be done with `EventTarget.addEventListener()`.

A quick look to the code must be enough to notice this, but just in case: **NOT READY FOR PRODUCTION, PROBABLY WON'T BE AND WHY WOULD YOU NEED YET ANOTHER LIBRARY**.

This is just a side project made for fun, for my own edification. I intend to build examples and find more common pain points I'd like to address, so the API will change.

_Nonetheless_, I'm always open to feedback. As soon as I have the docs ready and I feel that I've maxed out my own improvement capabilities, I'll even accept PRs if anyone is interested in contributing. Let's learn together 🙂.

## Upcoming

Things I'm planning to address in the following weeks:

- [ ] Write docs with the current status
- [ ] Add type annotations and comments for better DX
- [ ] Build stuff and take notes about things I'd like to address
- [ ] Write tests
- [x] Brag about it 'cause hell I'm proud (just invested a couple of [working] days so... well...)

Thanks for reading 🙂
