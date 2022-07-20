## NVPackageLogger

### Before You Begin Working
- Run git pull. This will get and sync all changes that have been pushed. 
- Run npm i. This will install and update all dependencies that have changed.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

The Web Stack is: MERN - MongoDB, ExpressJS, ReactJS, and NodeJS

This Web App uses Webpack as a module bundler (it takes javascript files and serves it to a browser so the browser can understand and render the code). Webpack has a feature (hot-module replacement) that allows it to listen for changes in the code and update the browser in real-time. It only replaces the components that change instead of refreshing the whole page.

### Webpack - run the Client
To run Webpack, use the command **npm run start** on a terminal in the same directory as the project. . Doing so runs the following command: "webpack serve --config webpack.dev.config.ts". This tells webpack to bundle the application based on the specifications of webpack.dev.config.ts file. After development, we will use a different the webpack.prod.config.ts file instead.

The server is an express server. Once it begins running, it is able to listen for request and specific paths and allows you to use a callbacks (a function that is called after it receives a request in our case). Express is able to do much more than this. More information here: https://expressjs.com/en/5x/api.html

### Express - run the Server
To start the express server, use the command **npm run server** on a terminal in the same directory as the project. Doing so runs the following command: "npx ts-node server/server.tsx". This uses NodeJS to run the server.tsx file inside the server folder. NodeJs is a javascript runtime environment that allows us to create network applications. NPX which stands for node package execute, allows us to execute file so we execute our server.tsx file which is the code of our server. ts-node transforms Typescript into Javascript so we can use Typescript in our files. More here: https://www.npmjs.com/package/ts-node

To stop the client or express server, press Crtl + C on the terminal it is runnning.

### To Run Client and Server 
Finally, to start both the client and the express server, use the command **npm run dev**. If you do this, pressing Crtl + C does not stop the client or server. 

### Top Stop Client and Server
To stop them, you'd need to run the commnand **npm run stop**.
