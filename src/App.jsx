import { useState, useEffect } from "react";
import "./index.css";
import HeartSVG from "./assets/heart.svg"; // Import SVG file
import Gif1 from "./assets/1.gif"; // Import GIF files
import Gif2 from "./assets/2.gif";
import Gif3 from "./assets/3.gif";
import Gif4 from "./assets/4.gif";
import Gif5 from "./assets/5.gif";
import Gif6 from "./assets/6.gif";
import Gif7 from "./assets/7.gif";
import Gif8 from "./assets/8.gif";
import Gif9 from "./assets/9.gif";
import Gif10 from "./assets/10.gif";
import BirthdaySong from "./assets/song.mp3"; // Import your MP3 file for the birthday song

const App = () => {
  const [message] = useState("HAPPY BIRTHDAY IRAAA");
  const [typedMessage, setTypedMessage] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [messagesList] = useState([
    "Anjaaay diklik anjaaayy",
    "lucu banget sih kamu raaaa",
    "Manis banget sih kamu raaaa",
    "Kiw kiw cukurukuk",
    "Ulang tahun tapi masih kecik huuu",
    "Semoga sehat selalu pokoke",
    "Jangan sering mandi malam yoo anjaaay",
    "Kuat kuat semester depan raaaaaa",
    "Jangan lupa janji teriak di depanku yaaaaaa 😚😙",
    "Raaaaaaaa iraaaaa hehehehe ",
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentGifIndex, setCurrentGifIndex] = useState(0); // Menyimpan index GIF yang akan ditampilkan
  const [audio] = useState(new Audio(BirthdaySong)); // Initialize audio element with your MP3 file

  // Daftar semua gambar GIF yang akan digunakan
  const gifList = [Gif1, Gif2, Gif3, Gif4, Gif5, Gif6, Gif7, Gif8, Gif9, Gif10];

  // Function untuk memulai lagu ulang tahun
  const playBirthdaySong = () => {
    audio.currentTime = 0; // Mulai dari awal lagu
    audio.play();
  };

  // Effect untuk memulai lagu ulang tahun pada mount komponen
  useEffect(() => {
    playBirthdaySong(); // Memulai lagu ulang tahun saat komponen di-mount
  }, []);

  // Effect untuk mengulang lagu saat selesai
  useEffect(() => {
    const handleEnded = () => {
      playBirthdaySong(); // Memulai ulang lagu setelah selesai
    };

    audio.addEventListener("ended", handleEnded);

    // Cleanup listener
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    // Menampilkan teks satu per satu
    const interval = setInterval(() => {
      if (typedMessage.length < message.length) {
        setTypedMessage(message.substring(0, typedMessage.length + 1));
      } else {
        clearInterval(interval);
        setShowFireworks(true); // Menampilkan animasi kembang api setelah teks selesai ditampilkan
      }
    }, 150); // Atur kecepatan pengetikan di sini (milidetik) - kecepatan lambat

    return () => clearInterval(interval);
  }, [message, typedMessage]);

  // Menangani aksi klik tombol
  const handleButtonClick = () => {
    setShowBox(true); // Menampilkan kotak setelah tombol ditekan
  };

  useEffect(() => {
    if (showBox) {
      // Mengubah pesan setiap 5 detik
      const timeout = setTimeout(() => {
        setCurrentMessageIndex((prevIndex) =>
          prevIndex === messagesList.length - 1 ? 0 : prevIndex + 1
        );
        setCurrentGifIndex((prevIndex) =>
          prevIndex === gifList.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Mengubah pesan setiap 5 detik

      return () => clearTimeout(timeout);
    }
  }, [showBox, messagesList, currentMessageIndex, gifList]);

  return (
    <div className="app-container">
      <h1 className={`neon-text ${showBox ? "fade-out" : ""}`}>
        {typedMessage}
      </h1>
      {showFireworks && (
        <div className="fireworks">
          {[...Array(30)].map((_, index) => (
            <div
              key={index}
              className="firework"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <img src={HeartSVG} alt="Heart" className="heart-svg" />
            </div>
          ))}
        </div>
      )}
      {!showBox && (
        <button className="custom-button" onClick={handleButtonClick}>
          cobak klik ini raaa
        </button>
      )}
      {showBox && (
        <div className={`message-box ${showBox ? "fade-in" : ""}`}>
          <p className="message-text">{messagesList[currentMessageIndex]}</p>
          <img
            src={gifList[currentGifIndex]}
            alt="GIF"
            className={`gif-image ${showBox ? "fade-in" : ""}`}
          />
        </div>
      )}
    </div>
  );
};

export default App;
