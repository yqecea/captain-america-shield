import React, { useEffect, useRef, useState } from 'react';
import { ShieldSVG } from './components/ShieldSVG';
import { Section } from './components/Section';
import { MousePointer2, Shield, Radio, Activity, Terminal, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<SVGSVGElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse parallax state
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Wait for GSAP to be available
    const initAnimations = () => {
      const { gsap, ScrollTrigger } = window;
      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);
      setIsLoaded(true);

      // --- SETUP ---
      const layers = gsap.utils.toArray('.shield-layer');
      const schematics = document.querySelector('.schematics');
      const techMarks = gsap.utils.toArray('.tech-mark');
      const starWireframe = document.querySelector('.star-wireframe');
      
      // Initial Reveal
      const tl = gsap.timeline();
      tl.fromTo(layers, 
        { scale: 3, opacity: 0, rotation: 180 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0, 
          stagger: 0.1, 
          duration: 2, 
          ease: "power3.out" 
        }
      );

      // --- MOUSE PARALLAX (Only active in Hero) ---
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX - innerWidth / 2) / innerWidth;
        const y = (e.clientY - innerHeight / 2) / innerHeight;
        
        mouseRef.current = { x, y };

        // Only apply if we are near the top
        if (window.scrollY < innerHeight) {
          gsap.to(layers, {
            x: (i) => x * 50 * (i + 1), // Layered depth
            y: (i) => y * 50 * (i + 1),
            rotationY: x * 20,
            rotationX: -y * 20,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            overwrite: 'auto' // Prevent conflict with scroll
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);


      // --- SCROLLYTELLING TIMELINE ---
      
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // SECTION 1 -> 2: DECONSTRUCTION (Origins)
      // Explode the shield layers outward in Z and Y space
      mainTimeline.to('.layer-1', { 
        yPercent: -20, 
        scale: 1.2, 
        opacity: 0.4,
        rotation: 45
      }, "phase1");
      
      mainTimeline.to('.layer-2', { 
        yPercent: 20, 
        scale: 1.1, 
        opacity: 0.8,
        rotation: -45
      }, "phase1");
      
      mainTimeline.to('.layer-3', { 
        scale: 0.8, 
        rotation: 90 
      }, "phase1");

      mainTimeline.to('.layer-5', { // Star
        scale: 1.5,
        fillOpacity: 0, // Fade out solid fill
      }, "phase1");
      
      mainTimeline.to(starWireframe, { opacity: 1 }, "phase1");
      mainTimeline.to(schematics, { opacity: 1 }, "phase1");
      mainTimeline.to(techMarks, { opacity: 1 }, "phase1");


      // SECTION 2 -> 3: ANALYSIS (Tactical)
      // Align into a grid-like structure or side-view
      mainTimeline.to('.shield-layer', {
        rotationX: 60, // Tilt significantly
        y: (i: number) => i * 100 - 200, // Stack vertically
        scale: 0.6,
        opacity: (i: number) => 1 - (i * 0.1), // Fade bottom layers
      }, "phase2");
      
      mainTimeline.to(schematics, { 
        rotationX: 60,
        scale: 1.5,
        opacity: 0.2
      }, "phase2");


      // SECTION 3 -> 4: LEGACY (The Choice)
      // Reassemble but different
      mainTimeline.to('.shield-layer', {
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        scale: (i: number) => 1 + (i * 0.1), // Concentric rings scaling up
        opacity: 1,
        rotation: (i: number) => i * 180, // Spin them
      }, "phase3");

      // SECTION 4 -> 5: FOOTER (Assemble)
      // Final lockup
      mainTimeline.to('.shield-layer', {
        scale: 10, // Zoom THROUGH the shield
        opacity: 0,
        ease: "power2.in"
      }, "phase4");

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    };

    // Small delay to ensure DOM is ready and Fonts loaded (roughly)
    const timer = setTimeout(initAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className={`bg-tactical-black text-vibranium overflow-hidden ${isLoaded ? 'fouc-ready' : 'no-fouc'}`}>
      
      {/* FIXED BACKGROUND ELEMENT */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center perspective-1000">
        <div className="w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] relative preserve-3d">
          <ShieldSVG ref={shieldRef} className="w-full h-full drop-shadow-2xl" />
        </div>
        
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 z-[-1]"></div>
        <div className="absolute inset-0 bg-radial-vignette z-[-1]"></div>
      </div>

      {/* FIXED HUD ELEMENTS */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-start pointer-events-none mix-blend-difference">
        <div className="flex flex-col gap-1">
          <h1 className="font-display font-bold text-2xl tracking-tighter uppercase">S.H.I.E.L.D. <span className="text-rogers-red text-xs align-top">ACCESS GRANTED</span></h1>
          <p className="font-mono text-[10px] opacity-70">FILE: ROGERS_STEVE_1918</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-mono text-sm">STATUS: <span className="text-hud-cyan animate-pulse">ACTIVE</span></p>
          <p className="font-mono text-[10px] opacity-50">VIBRANIUM COMPOSITE: 100%</p>
        </div>
      </div>

      <div className="fixed bottom-10 left-6 z-50 pointer-events-none hidden md:block">
        <div className="w-32 h-[1px] bg-white/20 mb-2"></div>
        <p className="font-mono text-[10px] opacity-50 vertical-rl transform rotate-180">SCROLL TO DECRYPT</p>
      </div>

      {/* --- SECTION 1: HERO --- */}
      <Section id="hero" className="items-center z-10">
        <div className="text-center relative z-10 mix-blend-overlay">
          <h2 className="font-display font-bold text-[15vw] leading-[0.8] opacity-10 tracking-tighter select-none">SENTINEL</h2>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="font-mono text-xs tracking-widest uppercase">Initiate</span>
          <ChevronDown size={20} />
        </div>
      </Section>

      {/* --- SECTION 2: ORIGINS (PROJECT REBIRTH) --- */}
      <Section id="origins" className="items-start z-10 pointer-events-none">
        <div className="max-w-xl relative">
          <div className="absolute -left-4 top-0 w-[2px] h-full bg-rogers-red opacity-50"></div>
          <span className="font-mono text-rogers-red text-sm mb-4 block tracking-widest">01 // PROJECT REBIRTH</span>
          <h2 className="font-display text-6xl md:text-8xl font-bold uppercase mb-6 leading-none">The Super <br/>Soldier</h2>
          <p className="font-mono text-sm md:text-base text-gray-400 leading-relaxed max-w-md">
            The serum didn't just enhance the body; it amplified the spirit. 
            Dr. Erskine's formula unlocked human potential, creating a tactical genius with absolute physical perfection.
            <br/><br/>
            <span className="text-white">"Not a perfect soldier, but a good man."</span>
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4 opacity-70">
            <div className="border border-white/10 p-4">
              <Activity size={16} className="mb-2 text-rogers-red" />
              <p className="font-mono text-xs text-gray-500">METABOLISM</p>
              <p className="font-display text-xl">4X HUMAN</p>
            </div>
            <div className="border border-white/10 p-4">
              <Shield size={16} className="mb-2 text-rogers-red" />
              <p className="font-mono text-xs text-gray-500">DURABILITY</p>
              <p className="font-display text-xl">ENHANCED</p>
            </div>
          </div>
        </div>
      </Section>

      {/* --- SECTION 3: TACTICAL (VIBRANIUM) --- */}
      <Section id="tactical" className="items-end text-right z-10 pointer-events-none">
         <div className="max-w-xl relative flex flex-col items-end">
          <div className="absolute -right-4 top-0 w-[2px] h-full bg-hud-cyan opacity-50"></div>
          <span className="font-mono text-hud-cyan text-sm mb-4 block tracking-widest">02 // VIBRANIUM MATRIX</span>
          <h2 className="font-display text-6xl md:text-8xl font-bold uppercase mb-6 leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
            KINETIC <br/> ABSORPTION
          </h2>
          <p className="font-mono text-sm md:text-base text-gray-400 leading-relaxed max-w-md text-right">
            Forged by Howard Stark. A unique vibranium-steel alloy that doesn't just deflect energy—it absorbs it.
            Completely vibration absorbent. Indestructible.
          </p>

          <div className="mt-8 space-y-2 font-mono text-xs w-64">
             <div className="flex justify-between border-b border-white/10 pb-1">
                <span>WEIGHT</span>
                <span>12 LBS</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-1">
                <span>DIAMETER</span>
                <span>2.5 FT</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-1">
                <span>COMPOSITION</span>
                <span className="text-hud-cyan">VIBRANIUM</span>
             </div>
          </div>
        </div>
      </Section>

      {/* --- SECTION 4: LEGACY (THE MAN) --- */}
      <Section id="legacy" className="items-center text-center z-10 pointer-events-none">
        <div className="max-w-4xl relative">
          <h2 className="font-display text-7xl md:text-9xl font-bold uppercase mb-2 leading-none mix-blend-difference">
            THE PRICE OF <br/> FREEDOM
          </h2>
           <p className="font-mono text-base md:text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
            "The price of freedom is high. It always has been. And it's a price I'm willing to pay. And if I'm the only one, then so be it. But I'm willing to bet I'm not."
          </p>
          <div className="mt-12 flex justify-center gap-8">
             <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                   <Terminal size={20} />
                </div>
                <span className="font-mono text-[10px] tracking-widest">STRATEGY</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                   <Radio size={20} />
                </div>
                <span className="font-mono text-[10px] tracking-widest">LEADERSHIP</span>
             </div>
          </div>
        </div>
      </Section>

      {/* --- SECTION 5: FOOTER (ASSEMBLE) --- */}
      <Section id="footer" className="items-center justify-center z-10">
        <div className="text-center">
          <p className="font-mono text-rogers-red tracking-[0.5em] text-sm mb-4 animate-pulse">INITIATIVE PROTOCOL</p>
          <h1 className="font-display text-[12vw] leading-none font-bold uppercase text-white hover:text-rogers-red transition-colors duration-500 cursor-pointer">
            ASSEMBLE
          </h1>
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-rogers-red hover:border-rogers-red hover:text-white transition-all font-mono text-xs tracking-widest uppercase w-64">
              Access Archives
            </button>
            <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all font-mono text-xs tracking-widest uppercase w-64">
              Mission Report
            </button>
          </div>
          <footer className="absolute bottom-6 left-0 w-full text-center">
             <p className="font-mono text-[10px] text-gray-600">STARK INDUSTRIES CLASSIFIED DATABASE © 1945-2024</p>
          </footer>
        </div>
      </Section>
      
      {/* Overlay Grain for Film Look */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

    </div>
  );
};

export default App;
