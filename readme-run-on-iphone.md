## Run a React Native app on your iPhone

You'll notice that React Native's scaffolded file structure looks like this:

```
__tests__/  
app.json          
index.ios.js  
node_modules/  
package.json
android/    
index.android.js  
ios/      
npm-debug.log
```

When you run `npm run start` (or `npm run start -- --root`) on a Mac, `index.ios.js` is running. You can confirm this by making small changes to the file and hitting `cmd + R` to reload. Those changes should show up. This is a pretty simple environment to work in, you just lean on Xcode's iPhone Simulator and a text editor. 

If you want to test your React Native project on an device, you'll have to use Xcode's tools. `cd` into the `ios/` folder. Let's see what we've got:

```
build/       
testProject-tvOS/       
testProject.xcodeproj/
testProject/  
testProject-tvOSTests/  
testProjectTests/
```

Ah! There's an Xcode project! Let's open Xcode on our computer, then go `File > Open...` and open `testProject.xcodeproj`. You'll see a lot of warnings and errors. It's okay (for now). 

Select `testProject` in the left-side navigation bar. Scroll down to the `Signing` settings and set `Team` to something (I just use the personal team option).

Now, set your destination device - first, plug your phone into your computer. You'll find it in `Product > Destination` list.

If you run into issues with the iOS release version and your device's iOS version, I will direct you to the `Deployment Target` option in your project's `General` settings. 

If you get issues beyond that, I will ask you to do some Googling and employ your technical sophistication.

The next step will be to authorize the app on your phone. Navigate to `Settings > General > Device Management`, click on the email you want to authorize, then click "trust". 




