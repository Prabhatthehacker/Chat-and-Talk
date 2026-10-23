# Pupper

Pupper is a chat app for messaging with friends and groups. It uses:
- Firebase for authentication, users, chat data, and real-time messaging
- GitHub Pages or Firebase Hosting for the web frontend
- Catbox.moe for uploaded files and photos
- Android app support using the same Firebase project

This README is a practical setup guide. You can edit it later, but it includes the setup steps you need to get the project running.

## What this project uses

- Frontend: React + TypeScript + Vite
- Hosting: GitHub Pages or Firebase Hosting
- Backend: Firebase Authentication + Firestore
- File uploads: Catbox.moe
- Max upload size: 200 MB per file

## Project structure

```text
Chat-and-Talk/
├── web/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
├── android/
├── backend/
├── functions/
├── scripts/
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── README.md
├── .gitignore
└── .github/
```

## 1) Create your Firebase project

1. Go to https://console.firebase.google.com
2. Click Create a project
3. Name it something like `pupper-chat`
4. Turn Google Analytics off if you want
5. Create the project

## 2) Enable Firebase Authentication

In Firebase:

1. Open Authentication
2. Click Sign-in method
3. Enable Email/Password
4. Save

This app uses email and password sign-in.

## 3) Create Firestore database

1. Open Firestore Database
2. Click Create database
3. Choose a location near your users
4. Start in production mode
5. Create the database

Then paste the contents of `firestore.rules` into:
- Firebase Console > Firestore Database > Rules
- Click Publish

Important: the project security rules must be published or users may not be able to create accounts or chat correctly.

## 4) Add your web app to Firebase

In Firebase:

1. Open Project settings
2. Go to Your apps
3. Click the web app icon `</>`
4. Register the app with a nickname like `web`
5. Copy the Firebase config values:
   - apiKey
   - authDomain
   - projectId
   - messagingSenderId
   - appId

Add them to `web/.env.local` or to your deployment environment.

Example:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_web_app_id
```

## 5) Add Firebase config to the app

In the project root, there is a `.env.example` file. Copy it to `web/.env.local` and fill in your Firebase values.

```bash
cd web
cp .env.example .env.local
```

Then open `.env.local` and insert your real Firebase values.

## 6) Catbox.moe setup for files and photos

This project uses Catbox.moe to upload files and photos. Catbox is not a Firebase Storage replacement; it is used for uploaded attachments when the app sends media.

### Catbox rules

- Upload endpoint: `https://catbox.moe/user/api.php`
- Request type: `POST`
- Content type: `multipart/form-data`
- Max file size: 200 MB per file

### Catbox upload example

```ts
async function uploadToCatbox(file: File, userHash?: string) {
  if (file.size > 200 * 1024 * 1024) {
    throw new Error('File too large. Max size is 200 MB.');
  }

  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', file);

  if (userHash) {
    form.append('userhash', userHash);
  }

  const response = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form,
  });

  const text = (await response.text()).trim();
  return text;
}
```

### Add Catbox settings to the app

If you want to use a Catbox account, add this variable in `.env.local`:

```env
VITE_CATBOX_USERHASH=your_catbox_userhash
VITE_MAX_UPLOAD_MB=200
```

If you do not have a Catbox account, the upload still works without `userhash` as long as the file is smaller than 200 MB.

## 7) Install the web app dependencies

From the project root:

```bash
cd web
npm install
```

Then run the app locally:

```bash
npm run dev
```

Your app should be available on:

```text
http://localhost:5173
```

## 8) Build the web app

Run:

```bash
cd web
npm run build
```

This generates the production build in:

```text
web/dist
```

## 9) Deploy to GitHub Pages

### Option A: GitHub Pages with the project repo

1. Push the repo to GitHub
2. Open the repository
3. Go to Settings
4. Click Pages
5. Under Build and deployment, choose GitHub Actions or a static deployment workflow
6. Save

If you are deploying from a static frontend built by Vite, the final output is usually `web/dist`.

### Important notes

- GitHub Pages is good for static hosting
- The backend still lives in Firebase
- Your site must have the Firebase config values available when built

## 10) Deploy the web app to Firebase Hosting

This is the best option if you want a real web deployment for your app.

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Log in

```bash
firebase login
```

### Initialize hosting in the project

From the project root:

```bash
firebase init hosting
```

When asked:
- choose your Firebase project
- set the public directory to `web/dist`
- configure as a single-page app if asked

Your `firebase.json` should look similar to:

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "web/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Deploy

```bash
firebase deploy --only hosting
```

Your site will be live at:

```text
https://your-project-id.web.app
```

or

```text
https://your-project-id.firebaseapp.com
```

## 11) Deploy Firebase backend rules

If you have not already deployed the Firestore rules:

```bash
firebase deploy --only firestore
```

## 12) Authorize your GitHub Pages domain or Firebase domain

In Firebase Console:

1. Open Authentication
2. Go to Settings
3. Click Authorized domains
4. Add your site domain

Examples:
- `yourusername.github.io`
- `your-project-id.web.app`
- `your-project-id.firebaseapp.com`

## 13) Android app setup

The Android project is already set up in the `android/` folder.

You need to:

1. Open the `android/` project in Android Studio
2. Add Firebase values to `local.properties` or the Android config
3. Sync Gradle
4. Build the APK

Example:

```bash
cd android
./gradlew assembleDebug
```

## 14) File upload size rule inside the project

The project should enforce the Catbox file limit before upload:

```ts
const MAX_CATBOX_FILE_BYTES = 200 * 1024 * 1024;
if (file.size > MAX_CATBOX_FILE_BYTES) {
  throw new Error('File is too large. Maximum is 200 MB.');
}
```

This should be enforced in the upload helper before the file is sent to Catbox.

## 15) Recommended setup checklist

Before you start using the app, make sure this is done:

- [ ] Firebase project created
- [ ] Email/Password enabled
- [ ] Firestore database created
- [ ] Firestore rules published
- [ ] Web app registered in Firebase
- [ ] Firebase config values added to `.env.local`
- [ ] Catbox upload tested with a small file
- [ ] Catbox upload tested with a file near 200 MB limit
- [ ] Site deployed on GitHub Pages or Firebase Hosting
- [ ] Authentication domain added to Firebase

## 16) Troubleshooting

### Firebase auth error

If sign in fails:
- check Email/Password is enabled
- check the Firebase config values are correct
- make sure your domain is authorized

### App shows "Almost there"

This means Firebase config is missing or incomplete. Check your `.env.local` values.

### Upload not working

Check:
- file size is under 200 MB
- request is sent as `multipart/form-data`
- the request includes `reqtype=fileupload`
- the file is attached as `fileToUpload`

### Site not loading after deployment

Check:
- build output is correct
- hosting/public folder is `web/dist`
- static route rewrites are configured
- Firebase project is correct

## 17) Final deployment recommendation

For your app, the clean setup is:

- Firebase = authentication + chat backend
- Catbox.moe = photo/file uploads
- Firebase Hosting = main web deployment
- GitHub Pages = optional alternative deploy target

This is the best practical setup for your Pupper app.

## 18) Next steps

You can later:
- replace the sample app name/logo
- customize the branding
- add profile images
- add message attachment previews
- add better file handling UI
- add notifications

If you want, I can also generate a second README version that is more polished and cleaner for GitHub, while keeping the same steps.
