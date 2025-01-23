---
published: 2017-12-11
title: Learning Google Oauth with FeatherJS
description: Learn Google Oauth with me and how to integrate it with featherjs.
tags: [oauth, featherjs, js, google, dev, learning]
category: tutorial
draft: false
url: https://medium.com/@john.nissenhooper/basic-google-oauth-with-featherjs-567a247251a8
cover: https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jigsawexplorer.com%2Fpuzzles%2Fsubjects%2Fmacaw-feathers-418x300.jpg&f=1&nofb=1&ipt=28c98be5f45fe5c792dec13e5cf8232445d29796528f1633d40aa77016f456df&ipo=images
---

## Basic Google Oauth with FeatherJS

After a lot of looking around the internet for a good example/tutorial on how to implement Oauth2.0 using Google with FeatherJS I figured it would probably be a good idea to write down what I learned in case others run into the same issues I had, or I forget everything I just did and need to come back to this.

This is going to assume you are using the Feathers CLI. We’re first going to run `feathers generate authentication` fill out your appropriate fields, personally I used the defaults opting to include google, facebook, local and github with a NeDB database.

That will generate a new directory inside your services dir called `users`, another one called `models` which contains a `users.model.js`, and a file named `authentication.js`. First thing we’re going to do is go into `authentication.js`. which should look similar to this



```js
  const authentication = require('feathers-authentication');  
  const jwt = require('feathers-authentication-jwt');  
  const local = require('feathers-authentication-local');  
  const oauth2 = require('feathers-authentication-oauth2');  
  const GoogleStrategy = require('passport-google-oauth20');  
  const FacebookStrategy = require('passport-facebook');  
  const GithubStrategy = require('passport-github');module.exports = function () {  
    const app = this;  
    const config = app.get('authentication');// Set up authentication with the secret  
    app.configure(authentication(config));  
    app.configure(jwt());  
    app.configure(local());app.configure(oauth2(Object.assign({  
      name: 'google',  
      Strategy: GoogleStrategy,  
    }, config.google)));app.configure(oauth2(Object.assign({  
      name: 'facebook',  
      Strategy: FacebookStrategy  
    }, config.facebook)));app.configure(oauth2(Object.assign({  
      name: 'github',  
      Strategy: GithubStrategy  
    }, config.github)));// The \`authentication\` service is used to create a JWT.  
    // The before \`create\` hook registers strategies that can be used  
    // to create a new valid JWT (e.g. local or oauth2)  
    app.service('authentication').hooks({  
      before: {  
        create: \[  
          authentication.hooks.authenticate(config.strategies)  
        \],  
        remove: \[  
          authentication.hooks.authenticate('jwt')  
        \]  
      }  
    });  
  };
```


next we need to go checkout the config file located in `config/default.json`. if you scroll down to around line 33 you should see an entry for your google setup. This is whats referenced in above with `config.google`. you need to make sure your scope is set to `["profile openid email"]` and your clientID and clientSecret are set. (To get these you need to [setup you app with google](https://console.developers.google.com/)) Don’t forget to **Enable the Google+ API** when setting up your project with google. I know no one uses G+ but we need it to get access to the profile info.

Now we need to edit our users.hooks to get ready for the profile data coming back from google. This is incredibly important and I wasted too many hours wondering what was wrong with my app, when I forgot to do this step. Dont make my mistake.

Apparently when you generate the authentication with feathers they do a lot of the boilerplate for you but they leave out the portion where you need to customize your data before the it actually gets passed all the way through the users service and creates a user in the DB. Feathers is smart but not quite smart enough to figure out where to grab the users email from, which is a problem since the generator sets that up as the unique key to base your db off of. If you skip this step you could end up with a db entry who’s email is undefined…. which makes things difficult.

Anyway the hook we’re going write is straightfowrad


```js
function customizeGoogleProfile(){  
 return function(hook){  
  if (hook.data.google) {  
   hook.data.email = hook.data.google.profile.emails  
    .find(email => email.type==='account').value  
  }  
  return Promise.resolve(hook);  
 }  
}
```


essentially we just check if the data coming in is from google, then we modify our hook to have an email attr on it which is the same as the one google sent us.

Next we will setup the front end bit. I am going to assume you already have the basic layout of the front end somewhat laid out, so I don’t need to go over configuring the client to use sockets etc. Anyway we want to first add a link that the user can click on to go and log in. This is as easy as

```html
<a href="/auth/google" className="button">Login With Facebook</a>
```

this will send them off magically to google’s login page. Now that you have the user being logged in you need to be sure to catch the cookie that comes back and log them into your app. For this be sure you have installed feathers-authentication-client and include it in your front end code.

```js
import auth from 'feathers-authentication-client';
```

After that you need to configure your feathers client to accept the cookie and set up your storage. (Be sure to do this after you configure your hooks, and sockets/rest).


```js
client.configure(socketio(socket))  
client.configure(hooks())  
 .configure(auth({storage: window.localStorage, cookie: 'feathers-jwt'}))
```

finally we call client.authentication and handle several promises.


```js
client.authenticate({})  
 .then(response => {  
  console.log('Authenticated!', response);  
  return client.passport.verifyJWT(response.accessToken);  
 })  
 .then(payload => {  
   console.log('JWT Payload', payload);  
   console.log("user\_id",payload.userId)  
    return client.service('users').get(payload.userId);  
 })  
 .then(user => {  
   client.set('user', user);  
 })  
 .catch(function(error){  
   console.error('Error authenticating!', error);  
 });
```


of course you should take the console logs out but it definitely helps when getting started. I’m also not sure why we need to call authenticate with essentially no parameters, but when i try to call authenticate with `{strategy: 'google'}` it fails. (If you have any idea why please feel free to leave a comment below). The only thing left to do is setup a way to have your users log out feathers already prerolled for us in the useful `logout` method. Im using react so it looked like this for me

```html
<a href="#" onClick={(e)=> {e.preventDefault(); client.logout()}}>logout</a>
```


So in total your front end client code should look something like this


```js
import React from 'react';  
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware, compose } from 'redux';  
import thunkMiddleware from 'redux-thunk';  
import { Map } from 'immutable';  
import { render } from 'react-dom';  
import io from 'socket.io-client';  
import feathers from 'feathers/client';  
import hooks from 'feathers-hooks';  
import socketio from 'feathers-socketio/client';  
import App from './containers/App';  
import CardApp from './reducers';  
import auth from 'feathers-authentication-client';const socket = io();  
const client = feathers();// Create the Feathers application with a \`socketio\` connection  
client.configure(socketio(socket))  
client.configure(hooks())  
 .configure(auth({storage: window.localStorage, cookie: 'feathers-jwt'}))  
   
client.authenticate({})  
 .then(response => {  
  console.log('Authenticated!', response);  
  return client.passport.verifyJWT(response.accessToken);  
 })  
 .then(payload => {  
   console.log('JWT Payload', payload);  
   console.log("user\_id",payload.userId)  
    return client.service('users').get(payload.userId);  
 })  
 .then(user => {  
   client.set('user', user);  
 })  
 .catch(function(error){  
   console.error('Error authenticating!', error);  
 });//users.remove();  
const composeEnhancers = window.\_\_REDUX\_DEVTOOLS\_EXTENSION\_COMPOSE\_\_ || compose;  
const store = createStore(  
  CardApp,  
  new Map({}),  
  composeEnhancers(applyMiddleware(thunkMiddleware))  
);render(  
 <Provider store={store}>  
  <div>  
  <App/>  
  <a href="#" onClick={(e)=> {e.preventDefault(); client.logout()}}>logout</a>  
  </div>  
 </Provider>,  
  document.getElementById('app')  
);module.hot.accept();
```


I’m sorry if this was hard to read or follow. I’m mostly doing this for myself but hopefully this can help someone who is going through the same frustrations I was last week. Let me know if I missed something or configured something incorrectly!
