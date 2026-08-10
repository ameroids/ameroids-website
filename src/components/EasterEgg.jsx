import { useEffect, useState } from 'react';
import AsteroidsGame from './AsteroidsGame';

export default function EasterEgg() {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    let buffer = '';
    const secret = 'ameroids';

    const onKeyDown = (e) => {
      // Ignore keypresses if the user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      buffer += key;
      
      // Keep buffer size manageable
      if (buffer.length > secret.length) {
        buffer = buffer.substring(buffer.length - secret.length);
      }
      
      if (buffer === secret) {
        setShowGame(true);
        buffer = ''; // Reset after triggering
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      {showGame && <AsteroidsGame onClose={() => setShowGame(false)} />}
    </>
  );
}
