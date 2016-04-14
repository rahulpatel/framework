# Framework

## Motivation
This is a client side framework that I decided to write as a learning exercise. I've taken some ideas used in Redex and applied them to the framework i've written. Along with this i've also decided to limit the view layer to React only due to it's performance.

## Quick Start
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

# Documentation

### Framework

* [`setup`](#setup)
* [`start`](#start)

### Routes

* [`route`](#route)

### Stores


## Framework

<a name="setup"></a>

### setup(options)

Provides you with an opportunity to set a default route and persistence the framework should use. You **must** call this before `start()`, if you provide a Persistence class then you must call this before you setup a store with the framework.

**Arguments**

* `options`
 - `defaultRoute` - The first route the framework should trigger, defaults to `/`
 - `Persistence` - A persistence class that implements the persistence interface

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

### route([`routeConfiguration`](#routeConfiguration))

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
