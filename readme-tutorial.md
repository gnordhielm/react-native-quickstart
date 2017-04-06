## Converting React to a React Native app

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
      <div className="box" onClick={this.clickMe.bind(this)}>
        Hello {this.props.name}. Please click me.
      </div>
    );
  }
}

React.render(<HelloThere name="Component" />, document.getElementById('content')); 
```  


### Step 1: Embrace CommonJS Modules 
Since we are no longer using regular React, at the top of our code we need to change:  
```
var React = require('react');
```  
to:  
```
var React = require('react-native');
```  

### Step 2: There *is* no DOM

Since the DOM is a web thing and we are now working in a mobile environment, the DOM is gone in React Native. This means we have to change how we write our HTML inside of jsx files.  
**Some Examples:**  
`<div></div>` === `<View></View>`  
`<span></span>` === `<Text></Text>`
>Another thing to note is View tags cannot contain any text, so we will just use them as tags to contain multiple things  

**So now we have to change this:**

```  
<div className="box" onClick={this.clickMe.bind(this)}>
	Hello {this.props.name}. Please click me.
</div>
```  
  
**To this:**  

```
<View className="box" onClick={this.clickMe.bind(this)}>
  <Text>Hello {this.props.name}. Please click me.</Text>  
</View>
```

### Step 3: Inline Styles Are the Way to Go

Because we will only be using JavaScript we don't really have any other options. React Native gives us Flexbox modeling which removes the need to use "float" and "inline-block".  

Here's an example of our code updated to include some styling:  

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

Using inline styling may seem a little backwards to us at first, but it's our only option when working with React and JSX.  Now we can create stylesheets at a component level.  

### Step 4: Handling Events

The equivalent to clicking in web pages is tapping an element on the mobile device. Let’s change our code so that the “alert” pops up when we tap the element.

To do this, first let's pull the TouchableOpacity out from React Native. Our deconstructed variables at the top should look like this now:

```
var {View, Text, StyleSheet, TouchableOpacity} = React;
```

Let's use our new `<TouchableOpacity />` tags. Start off by wrapping our View and Text tags inside of the Touchable tag:

```
<TouchableOpacity onPress={this.clickMe.bind(this)}>
  <View style={styles.box}>
    <Text>Hello {this.props.name}. Please click me.</Text>
  </View>
</TouchableOpacity>
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

