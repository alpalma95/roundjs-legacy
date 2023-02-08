# Scalefast Assignment - User list

You can check the live preview [here](https://alpalma95.github.io/scalefast-assignment/).

## Files structure

The entry point of the application is the `index.html` file, where we only link the `index.js` and `index.css` files.

The content of these two is coming from the `/src` folder, from `/js` and `/css` subdirectories respectively.

I tried to stick to a components-based architecture. The main layout is hard-coded with plain HTML, while both the user card and the error message are rendered dynamically from their dedicated `...Component.js` file.

### CSS

Each component has a dedicated CSS file (`/src/css/components`), which is ultimately imported into the `index.css`. This was extremely useful for the development phase.

### JavaScript

As for the JavaScript code, it is divided into two separate subfolders: `/utils` and `/components`. Both directories contain files exporting a single function: the former being functions that help to keep the main logic more organized, and the latter containing functions that return components that should be rendered dynamically.

## Running this project locally

Clone this repository and simply open the index.html with a live server. Since I really wanted to keep things "vanilla", I used [this extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). However, any other extension such as [live-server](https://www.npmjs.com/package/live-server) could work if you decide to initialize a node project.
