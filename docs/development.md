# development

this is a [next.js](https://nextjs.org/) project, so you can use all the features that come with it.
it uses the [pages routing system](https://nextjs.org/docs/pages/building-your-application/routing)

for styling, it uses [tailwindcss](https://tailwindcss.com/), and for state management, it uses [redux toolkit](https://redux-toolkit.js.org/)

## folder structure

- `components` - reusable components, split into folders using the [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) methodology, each component has a folder, and in it there's an `index.tsx` file
- `pages` - pages of the app, each file is a separate page
- `models` - typescript types and interfaces
- `hooks` - custom hooks
- `public` - static files
- `store` - redux store setup
- `styles` - global styles
- `util` - utility functions, mainly containing the custom RequestService
- `assets` - images and other assets
