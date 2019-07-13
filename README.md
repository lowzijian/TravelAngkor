# Installation Guides:

Using Terminal (OSX/Linux) or Command Line (Windows)

## Step 1 - Clone the project at desired location:
```
git clone https://github.com/lowzijian/TravelAngkor.git
```

## Step 2 - From the project folder, open cli and run the command below:
```
npm install
```

## Step 3 - Run the application:
```
react-native run-android
```

# If you see the error below...
![Error1 Image](/web/images/error1.PNG)

## Close the application and run these commands:
```
cd android
gradlew clean
cd ..
react-native run-android
```
