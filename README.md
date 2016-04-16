# Framework

## Motivation
This is a client side framework that I decided to write as a learning exercise. I've taken some ideas used in Redex and applied them to the framework i've written. Along with this i've also decided to limit the view layer to React only due to it's performance.

# Libraries used

**Core**

* [React](https://facebook.github.io/react/)
* [Router.js](https://www.npmjs.com/package/routerjs)

**Build**

* [Babel](https://babeljs.io/)
* [Webpack](http://webpack.github.io/)

# Quick Start

```javascript
import React from 'react';
import framework from '../src';

const AppView = (props) => {
  return (<h1>Hello, {props.name}!</h1>);
}

framework.setup({
  defaultRoute: '/:name'
});

const container = document.createElement('div');
document.body.appendChild(container);

framework.route({
  path: '/:name',
  view: {
    component: AppView,
    props: (req) => {
      return {
        name: req.params.name
      };
    },
    container: container
  }
});

framework.start();
```

# Example

The obligatory [todomvc example](example).

# Documentation

### Framework

* [`setup`](#setup)
* [`start`](#start)

### Routes

* [`route`](#route)
* [Route Configuration](#routeConfiguration)
* [View Object](#viewObject)
* [Request Object](#requestObject)

### Stores

* [`store`](#store)

### Store Instance

* [`get`](#storeGet)
* [`actions`](#storeActions)
* [`processor`](#storeProcessor)
* [`publish`](#storePublish)
* [`subscribe`](#storeSubscribe)

### Persistence Interface

* [`get`](#persistenceGet)
* [`set`](#persistenceSet)

## Framework

<a name="setup"></a>

### setup(options)

Provides you with an opportunity to set a default route and persistence the framework should use. You **must** call this before `start()`, if you provide a Persistence class then you must call this before you setup a store with the framework.

**Arguments**

* `options`
 - `defaultRoute` - The first route the framework should trigger, defaults to `/`.
 - `Persistence` - A class that implements the [persistence interface](#persistenceInterface).

**Example**

```javascript
const options = {
  defaultRoute: '/',
  Persistence: PersistenceClass
};
framework.setup(options);
```

---

<a name="start"></a>

### start()

Triggers the `defaultRoute` provided during the setup call.

**Example**

```javascript
framework.start();
```

## Routes

<a name="route"></a>

### route(routeConfiguration)

Provide the framework with a configuration for a route.

**Arguments**

* `options` - A [route configuration](#routeConfiguration) object.

**Examples**

```javascript
const AppComponent = React.createClass({
  render() {
    return (<h1>Hello, {this.props.name}</h1>);
  }
});

const options = {
  path: '/:name',
  view: {
    container: document.getElementById('#my-app-container'),
    props(req) {
      return {
        name: req.params.name
      };
    },
    component: AppComponent
  }
};

framework.route(options);
```

---

<a name="routeConfiguration"></a>

### Route Configuration

A route configuration object supports the following properties:

* `path` - (required) The absolute path (must begin with `/`) used to trigger the given route, the path can accept parameters (e.g. `/welcome/:name`) and wildcards (e.g. `/:name/*(*)`).
* `handler` - A function that is called with the current routes [request object](#requestObject).
* `view` - A [view object](#viewObject).
* `views` - An array of [view objects](#viewObject).

**Example**

```javascript
{
  path: '/:name',
  handler(req) {
    req.admin = true;
  },
  view: {
    container: document.getElementById('#my-app-container'),
    props(req) {
      return {
        name: req.params.name,
        admin: req.admin
      };
    },
    component: AppComponent
  }
}
```

---

<a name="viewObject"></a>

### View Object

A view object supports the following properties:

* `container` - A javascript element for where the given react component should be mounted.
* `props` - A function that is called with the current routes [request object](#requestObject), it should return an object of props to pass to the react component.
* `component` - A react component.

**Example**

```javascript
{
  container: document.getElementById('#my-app-container'),
  props(req) {
    return {
      name: req.params.name
    };
  },
  component: AppComponent
}
```

---

<a name="requestObject"></a>

### Request Object

A request object provides the following properties:

* `href` - The current path including the `#`
* `params` - An object containing any path parameters.
* `query` - An object of the current query string, values are **not** casted.
* `splats` - An array containing one element which will be the matched wildcard from the path, however this property is only available if the current path contains a wildcard.

**Example**

For a path of `/:name`:

```javascript
{
  href: '#/rahul?new=true',
  params: {
    name: 'rahul'
  },
  query: {
    new: 'true'
  }
}
```

For a path of `/:name/**`:

```javascript
{
  href: '#/rahul/welcome/admin',
  params: {
    name: 'rahul'
  },
  query: { },
  splats: [
    'welcome/admin'
  ]
}
```

## Stores

<a name="store"></a>

### store(name, initialState)

Create or retrieve a [store instance](#storeInstance). Not providing an `initialState` will cause the `initialState` to be set to an empty object, but if a persistence class is provided, the framework will set the `initialState` to the result of [`persistence.get()`](#persistenceGet).

**Arguments**

* `name` - (required) The identifier for the store.
* `initialState` - The initial state of the store, defaults to `{ }` or [`persistence.get()`](#persistenceGet) if persistence is provided.

**Example**

```javascript
const store = framework.store('todos', [ ]);

const todosStore = framework.store('todos');

// store === todosStore
```

<a name="storeInstance"></a>

## Store Instance

<a name="storeGet"></a>

### get()

Get the current state of the store.

**Example**

```javascript
const initialState = [
  {
    id: 0,
    title: 'My first todo',
    completed: false
  }
];
const store = framework.store('todos', initialState);

const state = store.get();

// state === initialState
```

---

<a name="storeActions"></a>

### actions()

Returns an object of all actions currently supported by the store.

**Example**

```javascript
const store = framework.store('todos', [ ]);
store.processor('ADD_TODO', (currentState, actionData) => [...state]);

const actions = store.actions();

// actions === {
//   ADD_TODO: 'ADD_TODO'
// }
```

---

<a name="storeProcessor"></a>

### processor(action, processor)

Give the store a processor (equivalent to a [reducer in redux](http://redux.js.org/docs/basics/Reducers.html)) for the given action.]

**Arguments**

* `action` - The name of the action this processor should be run for.
* `processor(currentState, actionData)` - A function that will receive the current state of the store along with the current action data. **The processor must return a new copy of the state**.

**Example**

```javascript
const store = framework.store('todos', [ ]);
store.processor('ADD_TODO', (currentState, actionData) => [...currentState]);
```

---

<a name="storePublish"><a/>

### publish(action, data)

Publish an action to the store. The store will run the necessary processor (if one has been provided) and call all subscribers with the new state and action. You may call publish without any arguments, which will cause the view(s) to re-render and the persistence to be updated once again with the same state. **The framework will automatically re-render to the current routes view(s) as well as persist the state if persistence has been provided**.

**Arguments**

* `action` - The name of the action.
* `data` - Any context you'd like to provide for the action, it'll be passed to the corresponding processor.

**Example**

```javascript
const store = framework.store('todos', []);
store.processor('ADD_TODO', (currentState, actionData) => {
  return [
    actionData,
    ...currentState
  ];
});
store.publish('ADD_TODO', {
  id: 1,
  title: 'My second todo',
  completed: false
});
```

---

<a name="storeSubscribe"></a>

### subscribe(callback)

Be notified of any updates to the store.

**Arguments**

* `callback(state, action)` - The function to call when anything is published to the store.

**Example**

```javascript
const store = framework.store('todos', [ ]);

store.subscribe((state, action) => {
  console.log(state);
  console.log(action);
});

store.processor('ADD_TODO', (currentState, actionData) => {
  return [
    actionData,
    ...currentState
  ];
});
store.publish('ADD_TODO', {
  id: 1,
  title: 'My second todo',
  completed: false
});

// Console output:
// [
//   {
//     id: 1,
//     title: 'My second todo',
//     completed: false
//   }
// ]
// 'ADD_TODO'
```

<a name="persistenceInterface"></a>

## Persistence Interface

Persistence is used internally by the framework to persist the state of stores to where ever you may require. It's simple interface means it's perfect for key value data stores, though it's extendable enough to be able to use just about any store you'd like. Checkout the [Persistence Class](example/stores/Persistence.js) in the [example](example) to see how to set it up to persist to state local storage.

<a name="persistenceGet"></a>

### get(storeName)

Get the state for the given store from the persistence.

**Arguments**

* `storeName` - The name of the store.

---

<a name="persistenceSet"></a>

### set(storeName, state)

Persist the state for the given store name.

**Arguments**

* `storeName` - The name of the store.
* `state` - The current state from the store.
