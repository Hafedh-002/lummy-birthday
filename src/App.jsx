
import { useEffect, useState } from "react";
import "./App.css";

const birthday = new Date("2026-11-02T00:00:00+03:00");

const memories = [
  {
    image: "/photo1.jpeg",
    title: "Our Birthday Girl 🌷",
    text: "A beautiful face deserves a beautiful frame. 💗",
    color: "rose",
    label: "My favorite photo",
  },
  {
    image: "/photo2.jpeg",
    title: "A Little Piece of Art 🎨",
    text: "Something you made, something worth keeping.",
    color: "lilac",
    label: "Hand-drawn memory #1",
  },
  {
    image: "/photo3.jpeg",
    title: "Another Little Treasure 🦋",
    text: "The little things can hold the sweetest memories.",
    color: "peach",
    label: "Hand-drawn memory #2",
  },
];

const petals = ["🌸", "🌷", "✨", "🦋", "💗", "✿"];

const letterMessage =
  "You are more than a friend to me. Thank you for bringing laughter, happiness, and beautiful memories into my life. I hope this new chapter brings you success, peace, love, and everything your heart wishes for. Never stop being the amazing person you are. No matter how much time passes, I hope we always have beautiful memories to look back on. You deserve all the happiness in the world. Happy Birthday, bestie! 💗";

function getCountdown() {
  const difference = birthday.getTime() - Date.now();
  const remaining = Math.max(0, difference);

  return {
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remaining / (1000 * 60)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
    finished: difference <= 0,
  };
}

function App() {
  const [time, setTime] = useState(getCountdown);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [petalsOn, setPetalsOn] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showPreviousPhoto = () => {
    setSelectedPhotoIndex((current) =>
      current === null
        ? null
        : (current - 1 + memories.length) % memories.length
    );
  };

  const showNextPhoto = () => {
    setSelectedPhotoIndex((current) =>
      current === null ? null : (current + 1) % memories.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedPhotoIndex !== null) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousPhoto();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          showNextPhoto();
        } else if (event.key === "Escape") {
          setSelectedPhotoIndex(null);
        }
      } else if (event.key === "Escape") {
        setSurpriseOpen(false);
        setLetterOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex]);

  useEffect(() => {
    if (!musicOn) return;

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      setMusicOn(false);
      return;
    }

    const audioContext = new AudioContextClass();
    let cancelled = false;
    let timeoutId;

    const playChime = () => {
      if (cancelled) return;

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const notes = [523.25, 659.25, 783.99, 659.25];

      oscillator.type = "sine";
      oscillator.frequency.value =
        notes[Math.floor(Math.random() * notes.length)];

      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.035,
        audioContext.currentTime + 0.08
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 1.1
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1.15);

      timeoutId = setTimeout(playChime, 1800);
    };

    audioContext
      .resume()
      .then(() => {
        if (!cancelled) playChime();
      })
      .catch(() => {
        if (!cancelled) setMusicOn(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      audioContext.close().catch(() => {});
    };
  }, [musicOn]);

  const selectedPhoto =
    selectedPhotoIndex === null
      ? null
      : memories[selectedPhotoIndex];

  const openBirthdaySurprise = () => {
    if (time.finished) {
      setSurpriseOpen(true);
    }
  };

  return (
    <div className="birthday-app">
      {petalsOn && (
        <div className="petal-layer" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              className="falling-petal"
              key={index}
              style={{
                left: `${(index * 37) % 100}%`,
                animationDelay: `${(index % 9) * 0.8}s`,
                animationDuration: `${10 + (index % 6) * 2}s`,
              }}
            >
              {petals[index % petals.length]}
            </span>
          ))}
        </div>
      )}

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">🌸</span>
          <span>Lummy's Day</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#gallery">Memories</a>
          <a href="#secret-letter">Secret Letter</a>
          <a href="#surprise">Surprise</a>
          <a href="#friendship">Friendship</a>
        </nav>

        <div className="nav-actions">
          <button
            className="music-toggle"
            onClick={() => setMusicOn((value) => !value)}
            aria-pressed={musicOn}
          >
            {musicOn ? "🎵 Music On" : "🎶 Garden Music"}
          </button>

          <button
            className="petals-toggle"
            onClick={() => setPetalsOn((value) => !value)}
            aria-pressed={petalsOn}
            aria-label="Toggle floating petals"
          >
            {petalsOn ? "🌸" : "✿"}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-decoration" aria-hidden="true">
            ✨ 🦋 🌷
          </div>

          <p className="eyebrow">A LITTLE WEBSITE, A LOT OF LOVE</p>

          <h1>
            Happy Birthday,
            <br />
            <span>Lummy Mkorofi</span> 💗
          </h1>

          <p className="hero-description">
            A little garden of memories, laughter, and wishes,
            made especially for you.
          </p>

          <a className="primary-button" href="#gallery">
            Explore Your Memories <span>♡</span>
          </a>

          <div className="countdown-container">
            <p className="countdown-title">
              {time.finished
                ? "IT'S YOUR SPECIAL DAY! 🎂"
                : "COUNTING DOWN TO YOUR SPECIAL DAY"}
            </p>

            <div className="countdown">
              {[
                ["Days", time.days],
                ["Hours", time.hours],
                ["Minutes", time.minutes],
                ["Seconds", time.seconds],
              ].map(([label, value]) => (
                <div className="countdown-item" key={label}>
                  <span className="countdown-number">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="countdown-label">{label}</span>
                </div>
              ))}
            </div>

            {time.finished && (
              <p className="birthday-unlocked-message">
                ✨ The wait is over! Your birthday magic is here! ✨
              </p>
            )}
          </div>

          <a
            className="scroll-indicator"
            href="#gallery"
            aria-label="Scroll to memories"
          >
            <span>↓</span>
          </a>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="section-heading">
            <span className="section-kicker">
              LITTLE MOMENTS, BIG MEMORIES
            </span>
            <h2>Our Memory Garden 🌷</h2>
            <p>
              Every picture holds a little story. Click one to take a
              closer look.
            </p>
          </div>

          <div className="memory-grid">
            {memories.map((memory, index) => (
              <button
                className={`memory-card ${memory.color}`}
                key={memory.image}
                onClick={() => setSelectedPhotoIndex(index)}
                aria-label={`Open photo: ${memory.title}`}
              >
                <div className="memory-image-wrap">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="memory-image"
                    loading="lazy"
                  />
                  <span className="memory-image-heart">♡</span>
                </div>

                <div className="memory-content">
                  <span className="memory-label">{memory.label}</span>
                  <h3>{memory.title}</h3>
                  <p>{memory.text}</p>
                  <span className="memory-open">View memory ↗</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          className={`secret-letter-section ${
            letterOpen ? "letter-magic-active" : ""
          }`}
          id="secret-letter"
        >
          <div className="letter-sparkle" aria-hidden="true">
            ✨
          </div>

          <div className="section-heading">
            <span className="section-kicker">JUST BETWEEN US 💌</span>
            <h2>A Little Secret for You</h2>
            <p>
              There is something special waiting inside this little
              envelope.
            </p>
          </div>

          <div className="letter-magic-layer" aria-hidden="true">
            <span className="letter-magic-glow" />

            {Array.from({ length: 6 }, (_, index) => (
              <span
                className={`letter-butterfly butterfly-${index + 1}`}
                key={`butterfly-${index}`}
              >
                🦋
              </span>
            ))}

            {Array.from({ length: 8 }, (_, index) => (
              <span
                className={`letter-magic-petal magic-petal-${[
                  "one",
                  "two",
                  "three",
                  "four",
                  "five",
                  "six",
                  "seven",
                  "eight",
                ][index]}`}
                key={`magic-petal-${index}`}
              >
                {petals[index % petals.length]}
              </span>
            ))}

            {Array.from({ length: 12 }, (_, index) => (
              <span
                className={`letter-firefly firefly-${index + 1}`}
                key={`firefly-${index}`}
              />
            ))}

            {Array.from({ length: 5 }, (_, index) => (
              <span
                className={`letter-magic-heart magic-heart-${index + 1}`}
                key={`heart-${index}`}
              >
                ♡
              </span>
            ))}
          </div>

          <div className="secret-letter-envelope">
            <button
              type="button"
              className={`envelope-button ${
                letterOpen ? "envelope-open" : ""
              }`}
              onClick={() => setLetterOpen(true)}
              aria-expanded={letterOpen}
              aria-label="Open your secret birthday letter"
            >
              <span className="envelope-glow" />
              <span className="envelope-back" />

              <span className="envelope-paper">
                <span>A little note for you</span>
                <span>💗</span>
              </span>

              <span className="envelope-flap" />
              <span className="envelope-front" />
              <span className="envelope-seal">♥</span>
              <span className="envelope-flower flower-left">🌸</span>
              <span className="envelope-flower flower-right">🌷</span>
            </button>

            <p className="envelope-caption">
              {letterOpen
                ? "Your special message is here 💗"
                : "Tap the envelope to reveal your surprise"}
            </p>

            {!letterOpen && (
              <button
                className="primary-button letter-open-button"
                onClick={() => setLetterOpen(true)}
              >
                Open Your Secret Letter 💌
              </button>
            )}
          </div>

          {letterOpen && (
            <article className="secret-letter-card letter-card-magical">
              <span className="letter-card-glimmer" aria-hidden="true" />

              <div className="letter-card-decoration" aria-hidden="true">
                🌸 ✨ 🦋 ✨ 🌸
              </div>

              <p className="letter-card-greeting">
                Happy Birthday, Lummy Mkorofi! 🌸
              </p>

              <p className="secret-letter-message">{letterMessage}</p>

              <p className="secret-letter-fists">👊🏻👊🏻👊🏻👊🏻</p>

              <div className="secret-letter-signature">
                With lots of friendship,
                <br />
                <strong className="glowing-signature">
                  Your best friend, Hafedh 💗
                </strong>
              </div>

              <div className="letter-card-decoration" aria-hidden="true">
                💗 🌷 ✨ 🌷 💗
              </div>

              <button
                className="secondary-button fold-letter-button"
                onClick={() => setLetterOpen(false)}
              >
                Fold the Letter ✉️
              </button>
            </article>
          )}
        </section>

        <section
          className={`surprise-section ${
            time.finished ? "surprise-unlocked" : "surprise-locked"
          }`}
          id="surprise"
        >
          <div className="surprise-decoration" aria-hidden="true">
            🎀 ✨ 🎂 ✨ 🎀
          </div>

          <span className="section-kicker">
            {time.finished
              ? "YOUR SPECIAL MOMENT IS HERE ✨"
              : "A LITTLE MAGIC IS WAITING"}
          </span>

          <h2>
            {time.finished
              ? "Your Birthday Surprise Is Ready! 🎁"
              : "One More Birthday Surprise 🎁"}
          </h2>

          <p>
            {time.finished
              ? "The birthday day has arrived! Your special celebration is ready."
              : "A little surprise is waiting just for you. Come back on November 2, 2026, to unlock it."}
          </p>

          {!time.finished && (
            <div className="surprise-lock-card">
              <span className="lock-icon" aria-hidden="true">
                🔒
              </span>
              <strong>Locked with love</strong>
              <span>Unlocks November 2, 2026</span>
              <span className="lock-sparkles" aria-hidden="true">
                ✨ 💗 ✨
              </span>
            </div>
          )}

          <button
            type="button"
            className={`primary-button surprise-button ${
              !time.finished ? "surprise-button-locked" : ""
            }`}
            onClick={openBirthdaySurprise}
            disabled={!time.finished}
            aria-disabled={!time.finished}
          >
            {time.finished
              ? "Unlock Your Birthday Surprise 🎁"
              : "🔒 Surprise Not Unlocked Yet"}
          </button>

          {!time.finished && (
            <p className="unlock-hint">
              The button will unlock automatically when your birthday begins.
            </p>
          )}
        </section>

        <section className="friendship-section" id="friendship">
          <div className="friendship-decoration" aria-hidden="true">
            🌷
          </div>

          <span className="section-kicker">A NOTE FROM THE HEART</span>
          <h2>To My Bestie, Lummy 💗</h2>

          <div className="friendship-card">
            <span className="friendship-quote">“</span>

            <p>
              Some people make ordinary days feel special just by
              being themselves. I am grateful for the laughter,
              kindness, and memories we share. May your new year of
              life bring you wonderful opportunities, peace, good
              health, and countless reasons to smile.
            </p>

            <p>
              Keep being yourself, keep dreaming, and keep shining.
              I hope we continue creating beautiful memories together.
            </p>

            <div className="friendship-signature">
              Forever cheering for you,
              <br />
              <strong>Hafedh 💗</strong>
            </div>
          </div>

          <div className="friendship-hearts" aria-hidden="true">
            ♡ 💗 ♡
          </div>
        </section>
      </main>

      <footer className="birthday-footer">
        <p>Made with 💗 especially for Lummy Mkorofi</p>
        <span>
          May your world always be full of flowers and sunshine 🌸
        </span>
      </footer>

      {surpriseOpen && time.finished && (
        <div
          className="surprise-modal birthday-celebration"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSurpriseOpen(false);
            }
          }}
        >
          <div
            className="birthday-confetti-layer"
            aria-hidden="true"
          >
            {Array.from({ length: 42 }, (_, index) => (
              <span
                className="birthday-confetti"
                key={index}
                style={{
                  left: `${(index * 47) % 100}%`,
                  animationDelay: `${(index % 14) * 0.12}s`,
                  animationDuration: `${3 + (index % 5) * 0.45}s`,
                  "--confetti-hue": `${(index * 31) % 360}`,
                }}
              />
            ))}
          </div>

          <div
            className="surprise-modal-content birthday-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="surprise-title"
          >
            <button
              className="modal-close"
              onClick={() => setSurpriseOpen(false)}
              aria-label="Close birthday surprise"
            >
              ×
            </button>

            <div className="birthday-unlock-badge">
              ✨ THE WAIT IS OVER ✨
            </div>

            <div className="modal-confetti" aria-hidden="true">
              🎉 ✨ 🎊 🌸 🎉
            </div>

            <div className="modal-cake birthday-cake" aria-hidden="true">
              🎂
            </div>

            <span className="section-kicker">
              NOVEMBER 2, 2026 · YOUR SPECIAL DAY
            </span>

            <h2 id="surprise-title">
              Happy Birthday, Lummy! 💗
            </h2>

            <p>
              Today is all about celebrating you! May every new day
              bring you closer to your dreams. May you find happiness
              in little things, courage in difficult moments, and
              wonderful people along the way.
            </p>

            <p className="modal-birthday-wish">
              You deserve a beautiful year ahead. Keep shining,
              birthday girl! 🌷
            </p>

            <div className="birthday-final-decoration" aria-hidden="true">
              🌸 💗 🦋 🎀 🦋 💗 🌸
            </div>

            <button
              className="primary-button"
              onClick={() => setSurpriseOpen(false)}
            >
              Keep This Memory 💗
            </button>
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div
          className="photo-viewer"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPhotoIndex(null);
            }
          }}
        >
          <div
            className="photo-viewer-content"
            role="dialog"
            aria-modal="true"
            aria-label="Photo gallery viewer"
          >
            <div className="viewer-topline">
              <span className="photo-counter">
                {selectedPhotoIndex + 1} / {memories.length}
              </span>

              <button
                className="viewer-close"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close photo viewer"
              >
                ×
              </button>
            </div>

            <div className="photo-viewer-stage">
              <button
                className="gallery-nav viewer-image-previous"
                onClick={showPreviousPhoto}
                aria-label="Previous photo"
              >
                ‹
              </button>

              <img
                key={selectedPhoto.image}
                className="viewer-image"
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
              />

              <button
                className="gallery-nav viewer-image-next"
                onClick={showNextPhoto}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>

            <div className="viewer-details" key={selectedPhoto.title}>
              <span className="memory-label">
                {selectedPhoto.label}
              </span>
              <h3>{selectedPhoto.title}</h3>
              <p>{selectedPhoto.text}</p>
            </div>

            <div className="viewer-thumbnails">
              {memories.map((memory, index) => (
                <button
                  key={memory.image}
                  className={`viewer-thumbnail ${
                    selectedPhotoIndex === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedPhotoIndex(index)}
                  aria-label={`View ${memory.title}`}
                  aria-current={
                    selectedPhotoIndex === index ? "true" : undefined
                  }
                >
                  <img src={memory.image} alt="" />
                </button>
              ))}
            </div>

            <p className="viewer-keyboard-hint">
              Use ← and → to navigate · Press Esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
