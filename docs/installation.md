# installation

## prerequisites

- [node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/)

## steps

1. clone the repository
2. install dependencies (`yarn install`)
3. create a `.env.local` file in the root of the project and fill it with the following content (you can use `.env.example` as a template):

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1338
NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_KEY=2137
GOOGLE_CLIENT_SECRET=2137
```

4. run the development server (`yarn dev`)