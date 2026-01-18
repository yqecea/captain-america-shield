export interface ScrollProgress {
  scrollY: number;
}

// Extend Window interface for GSAP if needed, though usually available globally via script tag
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}
