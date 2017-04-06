## Transforming a React App

With React being the key feature and the core principles coming from the React library, let’s take a look at what we need to transform a minimal React “Hello World” application into a React Native one.

We use some ES2015 features in this code example, specifically classes. It is completely feasible to stick with “React.createClass” or use a function form similar to the popular module pattern.

``` 
var React = require('react');

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <div className="box" onClick={this.clickMe.bind(this)}>Hello {this.props.name}. Please click me.</div>
    );
  }
}

React.render(<HelloThere name="Component" />, document.getElementById('content')); 
```  


### Step 1: Embrace CommonJS Modules 
In the first step we need to change requiring the React module to use “react-native” instead.

```
var React = require('react-native');

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <div className="box" onClick={this.clickMe.bind(this)}>Hello {this.props.name}. Please click me.</div>
    );
  }
}

React.render(<HelloThere name="Component" />, document.getElementById('content'));
```
What is usually a part of the tooling pipeline when developing a React web application is an integral part of React Native.

### Step 2: There is no DOM

Not surprisingly, there is no DOM on mobile. Where we previously used `<div />` we need to use `<View />` and where we used `<span />` the component we need here is `<Text />`.

```
var React = require('react-native');
var {View} = React;

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <View className="box" onClick={this.clickMe.bind(this)}>Hello {this.props.name}. Please click me.</View>
    );
  }
}

React.render(<HelloThere name="Component" />, document.getElementById('content'));
```

While it’s quite convenient to put text directly in `<div />` elements, in the native world text can’t be put directly in a `<View />`. For that we need to insert a `<Text />` component.

```
var React = require('react-native');
var {View, Text} = React;

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <View className="box" onClick={this.clickMe.bind(this)}>
        <Text>Hello {this.props.name}. Please click me.</Text>
      </View>
    );
  }
}

React.render(<HelloThere name="Component" />, document.getElementById('content'));
```

### Step 3: Inline Styles Are the Way to Go

React Native allows us to use the Flexbox modeling instead of messing around with “float” and “inline-block” that we are so familiar with in the web world. The interesting thing is that React Native does not use CSS.

```
var React = require('react-native');
var {View, Text, StyleSheet} = React;

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <View style={styles.box} onClick={this.clickMe.bind(this)}>
        <Text>Hello {this.props.name}. Please click me.</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  box: {
    borderColor: 'red',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 100
  }
});

React.render(<HelloThere name="Component" />, document.getElementById('content'));
```

Using inline styles seems bewildering at first. It is similar to the transition React developers had to go through when being confronted with JSX and previously using templating engines like Handlebars or Jade.

The idea is that we don’t have stylesheets globally in the way we use CSS. We declare the stylesheets directly at component level, and so we have all the information we need to see what our component does, the layout it creates, and the styles it applies.

```
var React = require('react-native');
var {Text} = React;

var Headline = function(props) {
  this.render = () => <Text style={headlineStyle.text}>{props.caption}</Text>;
};

var headlineStyles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});

module.exports = Headline;
```
### Step 4: Handling Events

The equivalent to clicking in web pages is tapping an element on the mobile device. Let’s change our code so that the “alert” pops up when we tap the element.

```
var React = require('react-native');
var {View, Text, StyleSheet, TouchableOpacity} = React;

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <TouchableOpacity onPress={this.clickMe.bind(this)}>
        <View style={styles.box}>
          <Text>Hello {this.props.name}. Please click me.</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  box: {
    borderColor: 'red',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 100
  }
});

React.render(<HelloThere name="Component" />, document.getElementById('content'));
```

Instead of events being directly available on `<View />` components, we need to explicitly use elements that trigger events, in our case a touch event when pressing the view. There are different types of touchable components available, each of them providing a different visual feedback.

### Step 5: Registering the Application

When developing with React for the browser, we just need to define a mount point, call “React.render”, and let React do its magic. In React Native, this is a little bit different.

```
var React = require('react-native');
var {View, Text, StyleSheet, TouchableOpacity, AppRegistry} = React;

class HelloThere extends React.Component {
  clickMe() {
    alert('Hi!');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.clickMe.bind(this)}>
          <View style={styles.box}>
            <Text>Hello {this.props.name}. Please click me.</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    borderColor: 'red',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 100
  }
});

var MainComponent = function() {
  this.render = function() {
    return <HelloThere name="Component" />;
  }
};

AppRegistry.registerComponent('MainComponent', function() {
  return MainComponent;
});
```
We have to register the component for the Objective-C side of things which is done using the “AppRegistry” object. The name we give has to match with the name inside the Xcode project.

Our Hello World React Native application has significantly more lines of code than its web counterpart, but on the other side React Native takes separation of concern a bit further especially because styles are defined with the component.

As a side note, we shouldn’t rebind the “clickMe” method to the “this” context in the “render” method, especially if our React (Native) application grows to be a bit more complex. It rebinds the method on every render call which can become quite a lot. The alternative is to bind the method inside the constructor.

