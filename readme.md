# React Native - A Guide for Web Developers

> Published, last update Apr 6 2017

By [Eric Van Dyn Hoven](https://github.com/evandynh), [Jake Hawkinson](https://github.com/jakehawk), [John Lee](https://github.com/johnlee94), and [Gus Nordhielm](https://github.com/gnordhielm).

## Contents

* [Context](#context)
* [Quickstart](#react-quickstart)
* [The App](#converting-react-to-a-react-native-app)
* [Next Steps](#next-steps)
* [Resources](#resources)

## Context

React Native is a framework by Facebook for building mobile apps. As the name suggests, it works along with React to facilitate the creation of mobile apps which are not "mobile web apps" or "hybrid apps", but indistinguishable from iOS/Android apps written in C. The idea is to find a happy medium between the conventional native app development and web development environments. There is a bit of a learning curve to React Native, especially if you're a fairly confident React or mobile developer - it can be frustrating to re-learn everything in the React Native paradigm. However, 'converts' are often pleased with the robust paradigm, availability of community support, and hospitable development environment. 

>[React Native for web developers.](https://hackernoon.com/townske-app-in-react-native-6ad557de7a7c)

[Comparing React Native and Ionic.](https://www.codementor.io/fmcorz/react-native-vs-ionic-du1087rsw)

### A Selection of Apps Built in React Native

### [Discovery VR](https://itunes.apple.com/us/app/discovery-vr/id1030815031?ls=1&mt=8)

![Discovery VR Icon](./readme-assets/discovery-vr-icon.jpg)

### [Airbnb](https://itunes.apple.com/us/app/airbnb/id401626263?mt=8&bev=1472279725_4ITWKWGX6KrmU6pT&utm_medium=web&utm_source=airbnb&_branch_match_id=307510898795870823)

![Airbnb Icon](./readme-assets/airbnb-icon.jpg)

### [Instagram](https://itunes.apple.com/app/instagram/id389801252?mt=8)

![Instagram Icon](./readme-assets/instagram-icon.jpg)

> You'll notice all of those links take you to to the iOS app store. While React Native will work cross-platform, we're going to be developing on Mac OS with Xcode in this guide.

### Prerequisites

The authors come from a web development background, so this guide will be most effective if you are comfortable working with the following technologies:

* Web dev fundamentals - HTML, CSS, and JavaScript.
* Node and Express ([more](https://zellwk.com/blog/crud-express-mongodb/)).
* React basics ([more](https://facebook.github.io/react/tutorial/tutorial.html)).

>If you are new to web development in general, this guide is not the best place to start, I (Gus) would recommend you start with: [Michael Hartl's Learn Enough series](https://www.learnenough.com/tutorials). 


## React Quickstart
Welcome to using React Native!  Let's go ahead and get started with figuring out what we need to install onto our machines!

**What we'll need**  
* Node.js *(We should all have this installed already)*  
* Xcode 8.x *(For iOS development)*  
* Android Studio *(For Android development)*  
* Watchman ```brew install watchman```  
* React Native CLI ```npm install -g react-native-cli```  
>*if you receive an error, try using ```curl -0 -L https://npmjs.org/install.hs | sudo sh```*

**Setting up Xcode**  
The fastest way to install Xcode 8 is through the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). This install will also include the iOS simulator.  With this tool you will be able to see changes you make to your code dynamically.

One other step will be to install the Xcode Command Line Tools.  Once Xcode has installed and is open, navigate to preferences in the Xcode menu.  Select the Location tab and install the tools by selecting the most recent version in the Command Line Tools drop down.

**Testing your Installation**  
Now we will use the React Native CLI(command line interface) to generate a new project named TestProject.  
>```react-native init TestProject```  
>```cd TestProject```  
>```npm run start -- --root```  

Since React Native is still a new technology, it has proven to be extremely prone to errors. For the final step above, we would normally run ```react-native run-ios```.  This was not working for us this morning and found the alternative and less intuitive command line to run our test app.

From here you can edit the file ```index.ios.js``` to make updates to the app. Use ```Command⌘ + R``` to refresh the simulator view when changes are made to the code.

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

## Next Steps

At this point, you have all of the React Native requirements on your machine, a good hunk of code for reference, and a general understanding of how it works. You might want to complete a tutorial on your own:

* [A task manager](https://egghead.io/courses/build-a-react-native-todo-application)
* [A chat app](https://blog.sendbird.com/tutorial-build-a-messaging-app-using-react-native/)

When you're ready (you might already be, who knows) you shouldn't waste any time getting your feet wet: build your own app! Keep the scope reasonable, make it something you'd like to use, and deploy it to the app store. Rinse and repeat.

## Resources  
* [React Native vs Ionic](https://www.codementor.io/fmcorz/react-native-vs-ionic-du1087rsw)
* [Github repo including every UI element included with NativeBase](https://github.com/GeekyAnts/NativeBase-KitchenSink)
