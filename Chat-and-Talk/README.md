# Chat and Talk

A messaging platform with **two separate products** that share one Firebase backend:

| Product | Tech | Notes |
|---|---|---|
| **Website** (`web/`) | React 18 + TypeScript + Vite | An ordinary responsive website. **Not a PWA** (no manifest, no service worker, no install prompt). CI fails if any PWA artefact appears. |
| **Android app** (`android/`) | Kotlin + Jetpack Compose, native WebRTC | A real native app. **Not a WebView wrapper.** Builds an installable APK. |
| **Backend** (`firestore.rules`, `firebase.json`) | Firebase Auth + Cloud Firestore | Same data models for both clients: an account made on one works on the other. No file storage is used. |

Design reference: warm cream/ivory surfaces, golden-brown and soft-orange accents, rounded panels (see the concept image used for the brief).

# Start here: complete beginner guide (no coding tools needed)

You do **not** need to install Node, Android Studio or anything else. You only need a web browser. GitHub (free) will build the website and the Android APK for you. Total time: about 45–60 minutes the first time.

Menu names in Firebase/GitHub change now and then; if a label differs slightly, pick the closest match.

## Step 1 — Make the accounts

1. **Google account** (for Firebase). Use an existing Gmail.
2. **GitHub account**: https://github.com/signup (free). Remember your username; it becomes part of your website address.

## Step 2 — Create the Firebase project (the backend)

1. Go to https://console.firebase.google.com → **Create a project** → name it `chat-and-talk` → you can turn Google Analytics **off** → **Create project**.
2. **Turn on sign-in.** Left menu **Build → Authentication → Get started → Email/Password → Enable → Save.**
3. **Create the database.** **Build → Firestore Database → Create database** → pick a location near your users (for India, `asia-south1 (Mumbai)`) → **Start in production mode** → **Enable**.
4. **Nothing to do for file storage.** Chat and Talk has no photos or files, so you do **not** need Firebase Storage, and nothing here requires a paid plan.
5. **Paste the security rules** (this is what keeps private chats private and numbers unique; do not skip it):
   - Open `firestore.rules` from this project in any text editor, select all, copy.
   - In Firebase: **Firestore Database → Rules** tab → select everything in the box, delete it, paste → **Publish**.
6. **Auto-delete old statuses.** **Firestore Database →** look for **Time-to-live (TTL)** (under *Indexes* or a tab of its own) → **Create policy** → collection group `statuses`, timestamp field `expiresAt` → Create.
7. **Register the website.** Click the gear ⚙ → **Project settings → General →** scroll to **Your apps →** click the **`</>`** (Web) icon → nickname `web` → leave “Firebase Hosting” **unticked** → **Register app**. You will see a block of code called `firebaseConfig`. **Keep this page open** (or copy it to a notepad); you need these 5 values: `apiKey`, `authDomain`, `projectId`, `messagingSenderId`, `appId`.
8. **Register the Android app.** Same page → **Add app → Android** → Package name **exactly** `com.chatandtalk.app` → **Register app** → click **Next / Next / Continue to console** (do **not** download anything).
   - Then **Project settings → General → Your apps →** click the Android app. Copy its **App ID**; it looks like `1:123456789:android:abcdef123456`.
9. **Allow your website to sign in.** **Authentication → Settings → Authorized domains → Add domain** → `YOURUSERNAME.github.io` (your GitHub username in lower case).

## Step 3 — Put the project on GitHub

1. On GitHub click **+ → New repository** → name `chat-and-talk` → **Public** (free GitHub Pages hosting needs a public repo) → **Create repository**.
2. Unzip `Chat-and-Talk.zip` on your computer. Open the unzipped `Chat-and-Talk` folder.
3. Upload. Choose **one** way:
   - **Easiest: GitHub Desktop** (https://desktop.github.com). Sign in → **File → Clone repository** → pick `chat-and-talk`. Copy **everything inside** the `Chat-and-Talk` folder (including the hidden `.github` folder) into the cloned folder → in GitHub Desktop type a summary like “first upload” → **Commit to main** → **Push origin**.
   - **Browser only:** on the empty repo page click **uploading an existing file**, then drag in everything inside `Chat-and-Talk` (folders `web`, `android`, `backend`, `functions`, `scripts`, `.github` and the loose files) → **Commit changes**. On Mac press **Cmd+Shift+.** in Finder to reveal `.github`.
4. **Check the upload.** In the repo you must see the path `.github/workflows/web.yml` and `.github/workflows/android.yml`. If `.github` is missing, click **Add file → Create new file**, type `.github/workflows/web.yml` as the file name, paste the contents from your copy, commit; repeat for `android.yml`.

## Step 4 — Give GitHub your Firebase values

Repo → **Settings → Secrets and variables → Actions**. There are two tabs, **Variables** and **Secrets**. Click **New repository variable/secret** for each row (name exactly as shown, value from Step 2).

**Variables tab**

| Name | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | `apiKey` from step 2.7 |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` (the `…:web:…` one) |
| `FIREBASE_PROJECT_ID` | same `projectId` |
| `DEPLOY_PAGES` | `true` |

**Secrets tab**

| Name | Value |
|---|---|
| `FIREBASE_API_KEY` | same `apiKey` |
| `FIREBASE_APP_ID` | the **Android** App ID from step 2.8 (`…:android:…`) |

(Optional ones for GIFs and calls over strict networks are in “Optional extras” below.)

## Step 5 — Turn on and build the website

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Repo → **Actions** tab. If you see a green button “I understand my workflows, go ahead and enable them”, click it.
3. Click **Website** (left list) → **Run workflow → Run workflow.** Wait 3–5 minutes for a green ✓.
4. Your site is at `https://YOURUSERNAME.github.io/chat-and-talk/` (also shown in **Settings → Pages**). Open it, click **Create account**, and sign up.

## Step 6 — Build the Android APK

1. **Actions → Android → Run workflow → Run workflow.** The first run takes 8–15 minutes.
2. When it shows a green ✓, click the run → scroll to **Artifacts** → download **Chat-and-Talk-debug-apk** (a zip) → unzip → you get `app-debug.apk`.
3. Send `app-debug.apk` to your Android phone (USB, Google Drive, WhatsApp-to-self…). Tap it. If asked, allow **Install unknown apps** for the app you opened it with. Needs Android 8.0 or newer.
4. Open **Chat and Talk** and create an account (an account made on the website works in the app and vice-versa).

## Step 7 — Try it with two accounts

1. Make two accounts (e.g. website on your laptop, app on your phone).
2. Sign up in each. Every new account is **given its own 10-digit Chat and Talk number automatically**. Open **Settings** (tap your name or the ⚙) to see it, **write it down**, and share it with the other person. It cannot be changed.
3. In account A: **Add → Add a chat** → type B’s number (shown in B’s Settings) → send a message. B should see it appear.
4. Try a GIF (needs the Giphy key below), a group (**Add → Add a group**, one number per line), a status (Status tab) and a voice/video call (📞 / 🎥 or the ⋮ menu). Allow microphone/camera when asked.

## If a build turns red ✗ (this is normal the first time)

This code was written without being able to compile it, so a first-build error is possible. Click the red run → click the red step → copy the red error lines → paste them to Claude together with the file name. A one-line fix usually solves it; then re-run the workflow (to change a file on GitHub: open it → ✏ pencil → edit → **Commit changes**).

Common fixes:
- **“Missing or insufficient permissions” in the app:** you skipped step 2.5 (rules not published).
- **Website shows “Almost there”:** a `VITE_FIREBASE_*` variable is missing or misspelled; fix it and re-run **Website**.
- **Login error “operation not allowed”:** step 2.2 (enable Email/Password).
- **Login error from the website domain:** step 2.9 (authorized domain).
- **App shows “Almost there”:** `FIREBASE_API_KEY` / `FIREBASE_APP_ID` secrets missing; fix and re-run **Android**.

## Optional extras

- **GIF search (Giphy):** create a free key at https://developers.giphy.com → *Create an App → API*. Add Variable `VITE_GIPHY_API_KEY` and Secret `GIPHY_API_KEY`, then re-run both workflows.
- **Calls that work on every network (TURN):** voice/video works on many home networks without it, but fails on some mobile/office networks. Get a TURN server from a provider (check its current free tier). Add Variable `VITE_TURN_URL` and `TURN_URL` (like `turn:host:3478`), Secrets `VITE_TURN_USERNAME`, `VITE_TURN_CREDENTIAL`, `TURN_USERNAME`, `TURN_CREDENTIAL`. Note: these values are visible to anyone who inspects the site/app.
- **Delete expired statuses automatically (workaround for the status-list gap):** needs the Firebase **Blaze** (pay-as-you-go) plan, Node.js and the Firebase CLI on your computer: `npm i -g firebase-tools`, `firebase login`, `firebase use --add` (choose your project), `cd functions && npm install && cd ..`, `firebase deploy --only functions`. The function `cleanupStatuses` then removes expired statuses every hour.
- **Use your own address instead of github.io:** Settings → Pages → Custom domain, and add that domain in Firebase → Authentication → Authorized domains.

## How the earlier problems are worked around

| Problem | Workaround in this project |
|---|---|
| No Gradle wrapper files could be generated offline | The Android workflow creates them automatically on every run; you never need them locally unless you use Android Studio (then run `gradle wrapper --gradle-version 8.7`). |
| Nothing could be compiled where this was written | GitHub Actions compiles it for you and shows exact errors (see “If a build turns red”). TypeScript “unused variable” strictness and unused-variable lint errors were relaxed so harmless warnings do not stop the first build. |
| No `package-lock.json` | CI uses `npm install`, which needs no lock file. |
| No APK shipped | Step 6 produces one in the cloud. |
| Firebase CLI needed for rules | Step 2.5 pastes the rules in the Console instead. |
| Status list could return expired items | Rules block expired reads and creation limits lifetime; TTL deletes them; optional hourly cleanup function removes them sooner; apps hide expired ones. |
| No push notifications when the app is closed | Not fixable without a server (FCM + Cloud Functions); notifications work while the app/tab is open. |
| Phone numbers could not be verified without paid SMS | Replaced by **app-assigned numbers**: each account gets a random, unique 10-digit Chat and Talk number at sign-up. Nobody can claim someone else’s number or change theirs, and the rules enforce it. These are not real telephone numbers. |
| Photos and files | Removed completely (no Storage, no uploads), so there is no file-handling risk and no need for a paid plan. |

---

# Technical reference

## Honest status of this delivery

This project was generated in an environment **without internet access**. That means:

- **Nothing was compiled or run here.** `npm install`, `tsc`, `vite build`, Gradle, the APK build, the Firestore emulator and real WebRTC calls were **not executed**. Only simple static checks (bracket balance) and one smoke test of the earlier attachment-validation logic (that feature has since been removed) were run. Expect to fix small compile errors on first build, especially in the Android code (it uses many third-party APIs written without a compiler to check them).
- **No APK is included.** The source plus a GitHub Actions workflow that builds a debug APK is provided. You must run the workflow (or Gradle) to get the APK.
- **`gradle-wrapper.jar` and the `gradlew` scripts are not included** (binary / cannot be downloaded here). The CI workflow generates them automatically; for Android Studio run `gradle wrapper --gradle-version 8.7` once in `android/`.
- **No `package-lock.json`.** CI uses `npm install`. Run `npm install` locally and commit the lock file, then switch CI to `npm ci` if you want reproducible installs.
- **Calls, rules tests and uploads have never been exercised against a real Firebase project.** Test instructions are below. Do not assume anything works until you have run them.
- Dependency versions were chosen from memory of the ecosystem; check each against current official docs before shipping (Firebase BoM, Compose BOM, `stream-webrtc-android`, Vite, etc.).

## 1. Project structure

```
Chat-and-Talk/
├── web/                      React + TypeScript website
│   └── src/{lib,components}  data layer (api.ts), WebRTC (calls.ts), UI
├── android/                  Native Android app (Kotlin, Compose)
│   └── app/src/main/java/com/chatandtalk/app/
├── backend/                  Firestore rules unit tests (emulator)
├── functions/                OPTIONAL hourly cleanup of expired statuses (Blaze plan)
├── firestore.rules           Security rules (messages, groups, status, call signaling)
├── firestore.indexes.json    TTL policy for statuses (no composite indexes needed)
├── firebase.json
├── scripts/check-no-pwa.sh   CI guard
├── .github/workflows/        web.yml, android.yml
├── .env.example
└── README.md
```

## 2. Architecture

**Data model (Firestore)** — identical for both clients:

- `users/{uid}`: `displayName`, `phone` (the app-assigned Chat and Talk number, 10 digits, set once and immutable), `createdAt`. Readable by any signed-in user.
  - `users/{uid}/contacts/{number}`: `number`, `name` (private to the owner).
  - `users/{uid}/cleared/{conversationId}`: `at` — per-user “delete conversation”.
- `phoneIndex/{number}`: `{uid}` — maps a Chat and Talk number to its account. `get` only (no listing) and **create-only**, so a number can never be taken over while the account exists.
- `conversations/{id}`: `type` (`direct`/`group`), `members[]`, `admins[]`, `name`, `lastMessage`, `unread{uid:n}`, `updatedAt`.
  - `messages/{id}`: `senderId`, `senderName`, `kind` (`text` or `gif`), `text`/`url`, `createdAt`, `readBy[]`.
- `statuses/{id}`: `authorId`, `authorName`, `kind`, `text`, `path`, `viewers[]`, `createdAt`, `expiresAt`; `views/{uid}` subcollection.
- `calls/{id}`: signaling (`callerId`, `participants[2]`, `conversationId`, `type`, `state`, `offer`, `answer`); `candidates/{id}` subcollection.

**Website**: Vite + React, `HashRouter` (works on GitHub Pages with no server rewrites), relative asset base (`./`).
**Android**: single-activity Compose app, `AppViewModel` + `Repo` (Firestore), `RtcSession`/`CallManager` (WebRTC). Firebase is initialised from build-time values, so no `google-services.json` is needed.

### How Chat and Talk numbers work

- When you sign up, the app generates a random **10-digit number** (first digit 1–9) with the device’s cryptographic random generator and registers it for your account in one atomic write. The `phoneIndex` collection is create-only, so if the number is already taken the write is refused and the app simply tries another (up to 12 attempts).
- Your number is shown in **Settings** with a Copy button and a reminder to write it down. It **cannot be changed**: the security rules allow the number to be set once (empty → number) and never edited.
- To chat, type the other person’s number in **Add → Add a chat**. If no account has that number you get a clear error and no chat is created. The number shows as the contact’s name until you save a name for it.
- Because numbers are assigned by the app (not self-claimed) and unique, nobody can impersonate someone else’s number. They are **not real telephone numbers**: they cannot call or text outside Chat and Talk, and they are not an identity check of the person behind an account.
- If you delete your account, your number is freed and cannot be recovered; chats keep their history by account id.
- Device contacts are never read.

### Features implemented

Register / sign in / sign out / password reset; automatic permanent Chat and Talk number per account; per-chat three-dot menu (voice, video, rename contact, manage/delete saved number, delete conversation, group details/leave) with confirmations; text, emoji and GIF (Giphy) messages with sending/failed states and retry; sent (✓) and read (✓✓) indicators; paginated history; text status (with a joke button, 24 h, per-author delete, viewer counts); groups (create, add members by number, rename, leave, member list); 1:1 WebRTC voice/video with Firestore signaling; Android runtime permissions, local notifications, offline banner. **Photos and files are intentionally not supported.** No separate Calls tab.

### Known limitations (not hidden)

- **Group calls are not supported** (1:1 only). The menu disables call actions in groups.
- **No remote push notifications.** Incoming messages/calls notify only while the app process is alive (Android) or the page is open (web). True background push needs FCM plus a trusted sender (Cloud Functions, Blaze plan) — not built.
- **“Delivered” is not tracked separately**; the UI shows sent and read.
- **Status expiry**: creation rules force a ~24 h lifetime (23–25 h window to tolerate clock skew) and direct reads of an expired status are denied. List queries are limited to the audience, and the clients filter expired rows; a Firestore **TTL policy** (in `firestore.indexes.json`) deletes expired documents later (TTL deletion can lag by up to a day or more). Expired statuses can therefore still be returned by a hand-written list query until TTL removes them. A scheduled Cloud Function would close that gap.
- **Status audience** is “people you have a direct chat with who joined” at posting time.
- **Account deletion** removes your profile, number, contacts, cleared markers and sign-in. Messages you sent remain in other members’ conversations; purging them needs a backend job.
- **TURN credentials in the client are visible** to anyone who opens the site/APK. Use a TURN provider with short-lived credentials issued by a trusted service for real deployments.
- Messages are stored unencrypted in Firestore (transport-encrypted, not end-to-end encrypted).
- Abuse prevention is limited to size/shape validation in rules; there is no rate limiting. Consider App Check.

## 3. Development tools

Node 20+, npm; JDK 17; Android Studio (Koala+) with Android SDK 34; Firebase CLI (`npm i -g firebase-tools`); a Firebase project; optionally a Giphy API key and a TURN server.

## 4. Firebase project configuration

1. Create a project at the Firebase Console.
2. **Authentication → Sign-in method**: enable **Email/Password**. (No SMS verification needed.)
3. **Firestore Database**: create a database (production mode).
4. **Add apps**: a **Web app** (copy the config values) and an **Android app** with package name `com.chatandtalk.app` (copy API key, App ID, project ID, storage bucket from Project settings).
5. **Authentication → Settings → Authorized domains**: add your GitHub Pages domain (`<user>.github.io`) and any custom domain.
6. Deploy rules: `firebase login && firebase use <project-id> && firebase deploy --only firestore` (this also applies the TTL policy for `statuses.expiresAt`; or paste `firestore.rules` into the Console as in the beginner guide).
7. Optional hardening: enable **App Check**, set budget alerts, restrict the API keys by referrer/package name.

## 5. Authentication setup

Email + password via Firebase Authentication (passwords are handled by Firebase; nothing is stored by this project). Reset emails use Firebase’s built-in template (customise it in the Console). Email verification is not enforced; add it if you need it.

## 6. Environment variables

See `.env.example`. Website values go in `web/.env.local` (local) or GitHub **Actions variables** (CI). Android values go in `android/local.properties` (copy `android/local.properties.example`), `-P` Gradle properties, or CI secrets/variables. **Never commit** service-account keys, keystores or passwords.

| Purpose | Website | Android |
|---|---|---|
| Firebase | `VITE_FIREBASE_*` (API key, auth domain, project ID, sender ID, app ID) | `FIREBASE_API_KEY`, `FIREBASE_APP_ID`, `FIREBASE_PROJECT_ID` |
| GIFs | `VITE_GIPHY_API_KEY` | `GIPHY_API_KEY` |
| TURN | `VITE_TURN_URL/USERNAME/CREDENTIAL` | `TURN_URL/USERNAME/CREDENTIAL` |

## 7. Run the website locally

```bash
cd web
cp ../.env.example .env.local   # then fill in values
npm install
npm run dev        # http://localhost:5173
npm run lint && npm run typecheck && npm test
npm run build      # outputs web/dist
```

Camera/microphone (and therefore calls) require HTTPS or `localhost`.

## 8. Deploy the website (GitHub Pages)

1. Push the repo to GitHub. Settings → **Pages** → Source: **GitHub Actions**.
2. Settings → Secrets and variables → Actions → **Variables**: add the `VITE_FIREBASE_*` values (and optional `VITE_GIPHY_API_KEY`, `VITE_TURN_URL`), plus `DEPLOY_PAGES = true`. Secrets: `VITE_TURN_USERNAME`, `VITE_TURN_CREDENTIAL` if used.
3. Push to `main` (or run the **Website** workflow). The `deploy` job publishes `web/dist`.
4. The site URL is `https://<user>.github.io/<repo>/`. The relative base and hash routing mean no extra path configuration is needed. GitHub Pages is static hosting only; the backend is Firebase.

Any other static host (Firebase Hosting, Netlify, Cloudflare Pages) also works: serve `web/dist` over HTTPS.

## 9. Open and build the Android project

Open `android/` in Android Studio, copy `local.properties.example` to `local.properties`, fill it in, sync, run. From a terminal:

```bash
cd android
gradle wrapper --gradle-version 8.7   # once; creates gradlew + wrapper jar
./gradlew :app:testDebugUnitTest :app:assembleDebug
```

Without Firebase values the app builds and shows a “Almost there” setup screen.

## 10. Generate and install the APK

`android/app/build/outputs/apk/debug/app-debug.apk`. Install: enable **Install unknown apps** for your file manager/browser, copy the APK to the phone, open it. Or `adb install -r app-debug.apk`. Requires Android 8.0 (API 26) or newer.

### Production release

A debug APK is for testing. For release you must: create an upload keystore (`keytool -genkeypair …`), keep it **outside Git**, add a `signingConfigs` block reading passwords from environment/CI secrets, enable R8 minification, build `bundleRelease` (AAB) and publish through Google Play Console (account, review and policies apply). Building an APK does not publish the app to Google Play.

## 11. Download the APK from GitHub Actions

Actions → **Android** → latest run → **Artifacts** → `Chat-and-Talk-debug-apk` (run manually via **Run workflow** if needed). Add the Android values as repository secrets/variables first (`FIREBASE_API_KEY`, `FIREBASE_APP_ID`, `GIPHY_API_KEY`, `TURN_USERNAME`, `TURN_CREDENTIAL` as secrets; `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `TURN_URL` as variables).

## 12. Configure and test voice/video calls

- Signaling is implemented in Firestore (`calls/*`), media is peer-to-peer WebRTC. STUN uses public Google servers. **Many mobile/corporate networks need TURN**; set the TURN variables (e.g. a self-hosted coturn or a TURN provider). Check the provider’s current pricing and limits.
- To test: sign in as two different accounts (e.g. website in two browser profiles, or website + Android), read each account’s number in Settings, start a chat with the other number, then use the 📞/🎥 buttons. Test voice and video, decline, hang up, a 45-second no-answer, and a call across different networks (cellular vs Wi-Fi) to confirm TURN works. **This has not been run for you.**

## 13. Security and privacy

- Enforced in rules: sign-in required everywhere; users edit only their own name and contacts; conversation and message access limited to `members`; senders cannot be spoofed; read receipts only add your own uid; group rename/add only by admins, members can leave but not remove others; numbers are unique, assigned once and immutable; only text and Giphy-GIF messages are accepted; statuses readable only by author/audience, deletable only by the author; call signaling only between the two participants and only for members of the same conversation.
- Stored data: email and password hash (Firebase Auth); display name and your assigned number (users collection, visible to signed-in users); contacts you save (private); text messages, GIF links, statuses and call signaling documents (retained until deleted — signaling documents are not auto-deleted); read receipts and unread counters. No photos or files are stored.
- Deleting a conversation hides it **for you only**. Deleting a saved number never deletes a conversation, and vice versa.
- Secrets: the Firebase web/Android keys are identifiers, not secrets. No admin credentials, service accounts or signing keys are in this repo; `.gitignore` excludes keystores and `local.properties`.
- Run the rules tests: `cd backend && npm install && npm run test:emulator` (needs Java 17 and the Firebase emulator). They cover unauthenticated access, non-member access, spoofed senders, read receipts, group permissions, status lifetime/expiry/delete, and call signaling access. They have not been run here.

## 14. Troubleshooting

- *“Almost there” screen*: Firebase values missing in the build.
- *`auth/operation-not-allowed`*: enable Email/Password in the Console.
- *Permission denied / “Missing or insufficient permissions”*: publish the latest `firestore.rules` (the number rules need the current version); for statuses make sure TTL and rules are deployed.
- *Blank site on Pages*: confirm Pages source is “GitHub Actions” and `VITE_BASE=./`.
- *GIFs unavailable*: add a Giphy key.
- *Call stuck on “Connecting…”*: add TURN; check microphone/camera permission; both users must be signed in with the page/app open.
- *Android: Gradle sync fails*: run `gradle wrapper --gradle-version 8.7`, use JDK 17, SDK 34 installed.
- *Android: unresolved reference*: this code was not compiled when written — check library versions against current docs.

## 15. Remaining manual steps

1. Create the Firebase project, enable Email/Password, deploy rules (section 4).
2. Fill environment variables / GitHub variables and secrets.
3. `npm install` (commit the lock file); run lint/typecheck/tests/build; fix any compile errors.
4. Generate the Gradle wrapper; build the APK; fix any compile errors.
5. Run the rules tests in the emulator.
6. Test two-client messaging, statuses, groups and calls against your real project, including TURN.
7. Decide on push notifications, App Check and a status-cleanup function.
8. For release: signing keystore, privacy policy, Play Console steps.

Service pricing and free-tier limits change; check current Firebase, GitHub, Giphy and TURN pricing before relying on them.
