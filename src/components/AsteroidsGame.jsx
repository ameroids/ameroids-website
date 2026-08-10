import { useEffect, useRef } from 'react';

export default function PingPongGame({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const paddleWidth = 15;
    const paddleHeight = 100;
    
    const state = {
      player: { x: 50, y: canvas.height / 2 - paddleHeight / 2, score: 0 },
      ai: { x: canvas.width - 50 - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0 },
      ball: { x: canvas.width / 2, y: canvas.height / 2, vx: 8, vy: 8, radius: 8 },
      keys: {}
    };

    const keydown = (e) => { state.keys[e.code] = true; };
    const keyup = (e) => { state.keys[e.code] = false; };
    
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);

    let animationId;
    const loop = () => {
      // Move Player
      if (state.keys['ArrowUp'] && state.player.y > 0) {
        state.player.y -= 10;
      }
      if (state.keys['ArrowDown'] && state.player.y < canvas.height - paddleHeight) {
        state.player.y += 10;
      }

      // Move AI
      const aiCenter = state.ai.y + paddleHeight / 2;
      if (aiCenter < state.ball.y - 15) {
        state.ai.y += 6;
      } else if (aiCenter > state.ball.y + 15) {
        state.ai.y -= 6;
      }

      if (state.ai.y < 0) state.ai.y = 0;
      if (state.ai.y > canvas.height - paddleHeight) state.ai.y = canvas.height - paddleHeight;

      // Move Ball
      state.ball.x += state.ball.vx;
      state.ball.y += state.ball.vy;

      // Ball collision with top/bottom (fixed getting stuck)
      if (state.ball.y - state.ball.radius < 0) {
        state.ball.y = state.ball.radius;
        state.ball.vy = Math.abs(state.ball.vy);
      } else if (state.ball.y + state.ball.radius > canvas.height) {
        state.ball.y = canvas.height - state.ball.radius;
        state.ball.vy = -Math.abs(state.ball.vy);
      }

      // Ball collision with paddles
      const hitPlayer = (state.ball.x - state.ball.radius <= state.player.x + paddleWidth &&
                         state.ball.x + state.ball.radius >= state.player.x &&
                         state.ball.y + state.ball.radius >= state.player.y &&
                         state.ball.y - state.ball.radius <= state.player.y + paddleHeight);
                         
      const hitAI = (state.ball.x + state.ball.radius >= state.ai.x &&
                     state.ball.x - state.ball.radius <= state.ai.x + paddleWidth &&
                     state.ball.y + state.ball.radius >= state.ai.y &&
                     state.ball.y - state.ball.radius <= state.ai.y + paddleHeight);

      if (hitPlayer && state.ball.vx < 0) {
        state.ball.vx = Math.abs(state.ball.vx) * 1.05; 
        state.ball.x = state.player.x + paddleWidth + state.ball.radius;
        const hitPos = (state.ball.y - state.player.y) / paddleHeight;
        state.ball.vy = (hitPos - 0.5) * 16;
      } else if (hitAI && state.ball.vx > 0) {
        state.ball.vx = -Math.abs(state.ball.vx) * 1.05;
        state.ball.x = state.ai.x - state.ball.radius;
        const hitPos = (state.ball.y - state.ai.y) / paddleHeight;
        state.ball.vy = (hitPos - 0.5) * 16;
      }

      // Scoring
      if (state.ball.x < -50) {
        state.ai.score++;
        resetBall(1);
      } else if (state.ball.x > canvas.width + 50) {
        state.player.score++;
        resetBall(-1);
      }

      function resetBall(dir) {
        state.ball.x = canvas.width / 2;
        state.ball.y = canvas.height / 2;
        state.ball.vx = 8 * dir;
        state.ball.vy = (Math.random() * 8 - 4);
      }

      // ─── DRAWING ───
      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#0a0f14');
      bgGrad.addColorStop(1, '#111a22');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center Line (Neon)
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 20]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]); 

      // Player Paddle (Neon Pink)
      ctx.shadowColor = '#ff0055';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(state.player.x, state.player.y, paddleWidth, paddleHeight);

      // AI Paddle (Neon Blue)
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(state.ai.x, state.ai.y, paddleWidth, paddleHeight);

      // Ball (Glowing White)
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Scores
      ctx.shadowBlur = 15;
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      
      ctx.shadowColor = '#ff0055';
      ctx.fillStyle = 'rgba(255, 0, 85, 0.2)';
      ctx.fillText(state.player.score, canvas.width / 4, 120);
      
      ctx.shadowColor = '#00f0ff';
      ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.fillText(state.ai.score, (canvas.width / 4) * 3, 120);

      // Reset shadow for next frame
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#0a0f14' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      
      {/* UI OVERLAY */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #00f0ff',
          color: '#00f0ff',
          padding: '12px 24px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          boxShadow: '0 0 10px #00f0ff, inset 0 0 10px #00f0ff',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'; }}
      >
        EXIT SYSTEM
      </button>

      <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          color: '#ff0055',
          fontFamily: 'monospace',
          fontSize: '14px',
          pointerEvents: 'none',
          textShadow: '0 0 5px #ff0055'
      }}>
        PADDLE OVERRIDE: [ARROW UP] / [ARROW DOWN]
      </div>
    </div>
  );
}
