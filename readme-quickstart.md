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