import React, { useState, useEffect } from 'react';

const AnimatedText = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const text1 = 'SLOW DOWN';
  const text2 = 'IT\'S AN EMERGENCY';
  const typingSpeed = 100; // ms per character

  useEffect(() => {
    // Type first text
    let currentIndex = 0;
    const interval1 = setInterval(() => {
      if (currentIndex <= text1.length) {
        setTypedText1(text1.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval1);
        // Start typing second text after first is complete
        let index2 = 0;
        const interval2 = setInterval(() => {
          if (index2 <= text2.length) {
            setTypedText2(text2.slice(0, index2));
            index2++;
          } else {
            clearInterval(interval2);
          }
        }, typingSpeed);
        return () => clearInterval(interval2);
      }
    }, typingSpeed);

    return () => clearInterval(interval1);
  }, []);

  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    brightness: 0.3 + Math.random() * 0.7
  }));

  const GlitchText = ({ children }) => {
    const isActive = isHovered || isClicked;
    
    return (
      <div className="relative">
        <div className={`relative transition-transform duration-700 ease-in-out 
          ${isActive ? 'animate-pulse-slow' : ''}`}>
          <div className="relative z-10 transition-all duration-700 ease-in-out">{children}</div>
          <div className={`
            absolute top-0 left-0 w-full
            transition-all duration-700 ease-in-out
            ${isActive ? '-translate-x-2 translate-y-2 text-white opacity-50' : 'opacity-0 translate-x-0 translate-y-0'}
          `}>{children}</div>
          <div className={`
            absolute top-0 left-0 w-full
            transition-all duration-700 ease-in-out
            ${isActive ? 'translate-x-2 -translate-y-2 text-white opacity-50' : 'opacity-0 translate-x-0 translate-y-0'}
          `}>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Star field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle-slow"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}%`,
            left: `${star.x}%`,
            background: `radial-gradient(circle at center, rgba(255,0,0,${star.brightness}), rgba(255,0,0,0) 100%)`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,0,0,${star.brightness * 0.8})`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div 
        className="relative perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsClicked(false);
        }}
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        onTouchStart={() => setIsClicked(true)}
        onTouchEnd={() => setIsClicked(false)}
      >
        {/* Dramatic light beam */}
        <div 
          className="absolute top-1/2 left-1/2 w-40 h-[200%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.2) 70%, transparent)',
            transform: `translateX(-50%) translateY(-50%) rotateZ(${isHovered ? '5' : '0'}deg)`,
            opacity: isHovered ? 0.8 : 0,
          }}
        />

        <div className="relative flex flex-col items-center gap-6">
          {/* Typing cursor effect */}
          <div className="relative">
            <GlitchText>
              <div 
                className="text-7xl md:text-9xl font-black text-red-600 tracking-normal transition-all duration-700 ease-in-out"
                style={{
                  fontFamily: 'Impact, system-ui, sans-serif',
                  transform: `scale(${isHovered ? (isClicked ? 0.95 : 1.05) : 1})`,
                  textShadow: isHovered ? 
                    '0px 0px 30px rgba(255,255,255,0.8), 0px 0px 60px rgba(255,255,255,0.6), 0px 0px 90px rgba(255,255,255,0.4)' :
                    '0px 0px 20px rgba(255,0,0,0.2)'
                }}
              >
                {typedText1}
              </div>
            </GlitchText>
          </div>
          
          <div className="relative">
            <GlitchText>
              <div 
                className="text-7xl md:text-9xl font-black text-red-600 tracking-normal transition-all duration-700 ease-in-out"
                style={{
                  fontFamily: 'Impact, system-ui, sans-serif',
                  transform: `scale(${isHovered ? (isClicked ? 0.95 : 1.02) : 1})`,
                  textShadow: isHovered ?
                    '0px 0px 30px rgba(255,255,255,0.8), 0px 0px 60px rgba(255,255,255,0.6), 0px 0px 90px rgba(255,255,255,0.4)' :
                    '0px 0px 20px rgba(255,0,0,0.2)'
                }}
              >
                {typedText2}
                {typedText1.length === text1.length && typedText2.length < text2.length && <span className="animate-blink">|</span>}
              </div>
            </GlitchText>
          </div>
        </div>
      </div>

      {/* Scanning line effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          background: 'linear-gradient(transparent, rgba(255,255,255,0.15) 0%, transparent)',
          backgroundSize: '100% 4px',
          animation: isHovered ? 'scan 6s linear infinite' : 'none',
          opacity: isHovered ? 1 : 0,
        }}
      />

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes twinkle-slow {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        @keyframes pulse-slow {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-twinkle-slow {
          animation: twinkle-slow linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default AnimatedText;