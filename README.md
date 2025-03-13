## Build and run your app

Clone this repository and
Install dependencies:
```sh
yarn
```

### Android
``http://localhost:3000`` is not working for Android. To fix this, put the local IP to ``env.json (root/env.json)``. Ex: ``http://192.168.x.x:3000`` something like that.

```sh
yarn android
```

### iOS
Run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

Build and run the app:

```sh
yarn ios
```

