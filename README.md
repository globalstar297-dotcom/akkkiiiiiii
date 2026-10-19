# 🎂 A Magical Birthday for Akki 💖

A beautiful, premium, interactive birthday surprise website built with React + Vite + Tailwind CSS + Framer Motion.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Adding Real Photos

1. Place your photos in the `public/` folder (e.g., `public/photo1.jpg`)
2. Open `src/config.js`
3. Update the `gallery` array — set the `src` field for each item:

```js
gallery: [
  { id: 1, src: '/photo1.jpg', title: 'Memory 1', caption: 'Your caption here 💗' },
  { id: 2, src: '/photo2.jpg', title: 'Memory 2', caption: 'Another caption 😊' },
  // ...
],
```

---

## 🎵 Adding Background Music

1. Get a royalty-free birthday/celebration instrumental (e.g., from [pixabay.com](https://pixabay.com/music/) or [freemusicarchive.org](https://freemusicarchive.org/))
2. Save it as `public/birthday-music.mp3`
3. The music toggle button will automatically work once the file is present

---

## 💌 Editing the Birthday Letter

Open `src/config.js` and update the `letter` section:

```js
letter: {
  greeting: 'Dear Akki,',
  body: `Your custom message here...`,
  signoff: 'With lots of love,',
  signature: 'Your Cousin ❤️',
},
```

---

## 🌐 Deploying to Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect the Vite configuration
4. Click **Deploy** — your site will be live in minutes!

The `vercel.json` file is already configured for SPA routing.

---

## 🛠️ Project Structure

```
akki/
├── public/
│   ├── placeholder.svg       # Default gallery placeholder
│   └── birthday-music.mp3    # Add your music file here
├── src/
│   ├── components/
│   │   ├── OpeningScreen.jsx     # Magical opening experience
│   │   ├── HeroSection.jsx       # Grand birthday greeting
│   │   ├── BirthdayLetter.jsx    # Animated envelope + letter
│   │   ├── MemoriesGallery.jsx   # Photo gallery with lightbox
│   │   ├── ReasonsSpecial.jsx    # Animated special cards
│   │   ├── InteractiveSurprises.jsx  # Candles, tap happiness, wish jar
│   │   ├── GrandFinale.jsx       # Night sky finale
│   │   ├── FloatingParticles.jsx # Background floating emojis
│   │   ├── MusicToggle.jsx       # Music on/off button
│   │   └── Confetti.jsx          # Confetti helper
│   ├── hooks/
│   │   ├── useConfetti.js        # Confetti trigger hook
│   │   └── useTypingAnimation.js # Letter typing effect hook
│   ├── config.js                 # ⭐ All editable content lives here
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

Made with 💖 for Akki's special day!
