import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to autoplay on mount
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          // Some browsers allow autoplay if it's explicitly called.
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.log("Autoplay prevented by browser. User interaction required.");
        setIsPlaying(false);
      }
    };
    
    // Play on first user interaction if autoplay failed
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        playAudio();
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    if (audioRef.current) {
      audioRef.current.volume = 0.15; // Set volume to 15%
    }
    playAudio();
    document.addEventListener('click', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent triggering the global interaction listener
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999 }}>
      <audio ref={audioRef} src="/background-music.mp3" loop />
      <button 
        onClick={togglePlay}
        style={{
          background: 'rgba(25, 25, 25, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(25, 25, 25, 0.8)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(25, 25, 25, 0.5)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
}
