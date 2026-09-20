import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LOGO_PATHS } from './logoData';
import './Preloader.css';

export interface PreloaderProps {
  /** Callback fired immediately when the exit animation finishes and preloader is dismissed */
  onComplete?: () => void;
  /** Optional manual override to force reduced motion / fast mode */
  skipAnimation?: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  skipAnimation = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sMaskStrokeRef = useRef<SVGPathElement>(null);
  const sGuideStrokeRef = useRef<SVGPathElement>(null);
  const aLeftMaskRef = useRef<SVGPathElement>(null);
  const aRightMaskRef = useRef<SVGPathElement>(null);
  const aLeftGuideRef = useRef<SVGPathElement>(null);
  const aRightGuideRef = useRef<SVGPathElement>(null);
  const goldLineRef = useRef<SVGPathElement>(null);
  const brandNameRef = useRef<SVGPathElement>(null);
  const taglineRef = useRef<SVGPathElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Lock scrolling on body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Check system preference for reduced motion
    const prefersReducedMotion =
      skipAnimation ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Setup GSAP Context for reliable React lifecycle cleanup
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      if (prefersReducedMotion) {
        // Instant graceful reveal for reduced motion
        gsap.set('.s-reveal-group, .a-reveal-group, .gold-line-group, .brand-name-group, .tagline-group', {
          visibility: 'visible',
          opacity: 1,
        });
        gsap.set([sMaskStrokeRef.current, aLeftMaskRef.current, aRightMaskRef.current], {
          strokeDashoffset: 0,
        });

        gsap.to(container, {
          opacity: 0,
          delay: 0.8,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            document.body.style.overflow = originalOverflow || '';
            if (container) container.style.display = 'none';
            onComplete?.();
          },
        });
        return;
      }

      // Calculate path lengths for precise stroke animations
      const sMaskLength = sMaskStrokeRef.current?.getTotalLength() || 1200;
      const sGuideLength = sGuideStrokeRef.current?.getTotalLength() || 1200;
      const aLeftLength = aLeftMaskRef.current?.getTotalLength() || 500;
      const aRightLength = aRightMaskRef.current?.getTotalLength() || 500;

      // Set initial SVG stroke dash properties
      if (sMaskStrokeRef.current) {
        gsap.set(sMaskStrokeRef.current, {
          strokeDasharray: sMaskLength,
          strokeDashoffset: sMaskLength,
        });
      }
      if (sGuideStrokeRef.current) {
        gsap.set(sGuideStrokeRef.current, {
          strokeDasharray: sGuideLength,
          strokeDashoffset: sGuideLength,
          opacity: 0.4,
        });
      }
      if (aLeftMaskRef.current && aLeftGuideRef.current) {
        gsap.set([aLeftMaskRef.current, aLeftGuideRef.current], {
          strokeDasharray: aLeftLength,
          strokeDashoffset: aLeftLength,
        });
      }
      if (aRightMaskRef.current && aRightGuideRef.current) {
        gsap.set([aRightMaskRef.current, aRightGuideRef.current], {
          strokeDasharray: aRightLength,
          strokeDashoffset: aRightLength,
        });
      }

      // Set initial element states
      gsap.set('.s-reveal-group, .a-reveal-group, .gold-line-group, .brand-name-group, .tagline-group', {
        visibility: 'visible',
      });
      gsap.set(goldLineRef.current, {
        scaleX: 0,
        transformOrigin: '508px 412.5px',
      });
      gsap.set(brandNameRef.current, {
        opacity: 0,
        y: 10,
      });
      gsap.set(taglineRef.current, {
        opacity: 0,
        y: 8,
      });

      // Master Architectural Reveal Timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          document.body.style.overflow = originalOverflow || '';
          if (container) {
            container.style.display = 'none';
          }
          onComplete?.();
        },
      });

      // Step 1: Subtle architectural frame corners fade-in
      tl.to('.preloader-frame-corner', {
        opacity: 0.5,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power1.inOut',
      }, 0.05);

      // Step 2: "S" Architectural drafting stroke reveal
      tl.to(
        sGuideStrokeRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        0.15
      );
      tl.to(
        sMaskStrokeRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.95,
          ease: 'power2.inOut',
        },
        0.18
      );
      // Fade out the delicate drafting guide line once solid S has filled
      tl.to(
        sGuideStrokeRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
        },
        0.95
      );

      // Step 3: "A" Construction - dual architectural diagonal strokes
      tl.to(
        [aLeftMaskRef.current, aRightMaskRef.current],
        {
          strokeDashoffset: 0,
          duration: 0.75,
          stagger: 0.04,
          ease: 'power2.out',
        },
        0.58
      );
      tl.to(
        [aLeftGuideRef.current, aRightGuideRef.current],
        {
          strokeDashoffset: 0,
          duration: 0.65,
          stagger: 0.04,
          ease: 'power2.out',
        },
        0.55
      );
      tl.to(
        [aLeftGuideRef.current, aRightGuideRef.current],
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.out',
        },
        1.15
      );

      // Step 4: Thin Gold Horizontal Line expansion from center outward
      tl.to(
        goldLineRef.current,
        {
          scaleX: 1,
          duration: 0.55,
          ease: 'power3.inOut',
        },
        1.22
      );

      // Step 5: Studio Name ("SHAN ARCH STUDIO") subtle upward fade
      tl.to(
        brandNameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        1.5
      );

      // Step 6: Tagline ("DESIGN. BUILD. INSPIRE.") subtle upward fade
      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        1.8
      );

      // Step 7: Brief hold & Architectural Exit Transition
      // Hold completed logo until t = 2.5s, then architectural curtain slide up
      tl.to('.preloader-frame-corner', {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      }, 2.45);

      tl.to(contentRef.current, {
        y: -30,
        opacity: 0.15,
        duration: 0.65,
        ease: 'power3.in',
      }, 2.5);

      tl.to(
        container,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
        },
        2.55
      );
    }, containerRef);

    return () => {
      // 3. Cleanup context and guarantee scroll restoration on unmount
      ctx.revert();
      document.body.style.overflow = originalOverflow || '';
    };
  }, [onComplete, skipAnimation]);

  // Centerline / Spine definition for the "S" architectural stroke
  // Precisely calculated to sweep through the center of the logo's S polygon
  const sSpinePath = `
    M 428 54
    C 410 18, 350 4, 298 22
    C 248 40, 240 82, 250 112
    C 264 146, 324 168, 382 192
    C 440 216, 452 256, 440 290
    C 426 324, 362 340, 304 330
    C 262 322, 238 296, 239 274
  `;

  // Construction lines for "A" monogram
  // Apex at (635, 20), left diagonal to (491, 332), right diagonal to (776, 332)
  const aLeftSpine = 'M 635 15 L 485 338';
  const aRightSpine = 'M 635 15 L 782 338';

  return (
    <div
      ref={containerRef}
      className="preloader-container"
      role="status"
      aria-label="Shan Arch Studio Loading..."
      aria-live="polite"
    >
      {/* Ultra-subtle architectural drafting grid */}
      <div className="preloader-bg-grid" aria-hidden="true" />

      {/* Architectural drafting corner markers */}
      <div ref={cornersRef} aria-hidden="true">
        <div className="preloader-frame-corner corner-tl" />
        <div className="preloader-frame-corner corner-tr" />
        <div className="preloader-frame-corner corner-bl" />
        <div className="preloader-frame-corner corner-br" />
      </div>

      {/* Main Preloader Content Stage */}
      <div ref={contentRef} className="preloader-content">
        <div className="preloader-stage">
          <svg
            className="preloader-svg"
            viewBox={LOGO_PATHS.viewBox}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Shan Arch Studio"
          >
            <defs>
              {/* Mask for Architectural Stroke Reveal of S */}
              <mask id="s-stroke-mask" maskUnits="userSpaceOnUse">
                <rect width="1007" height="615" fill="black" />
                <path
                  ref={sMaskStrokeRef}
                  d={sSpinePath}
                  fill="none"
                  stroke="white"
                  strokeWidth="58"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>

              {/* Mask for Architectural Diagonal Construction of A (Left Arm) */}
              <mask id="a-left-mask" maskUnits="userSpaceOnUse">
                <rect width="1007" height="615" fill="black" />
                <path
                  ref={aLeftMaskRef}
                  d={aLeftSpine}
                  fill="none"
                  stroke="white"
                  strokeWidth="60"
                  strokeLinecap="square"
                />
              </mask>

              {/* Mask for Architectural Diagonal Construction of A (Right Arm) */}
              <mask id="a-right-mask" maskUnits="userSpaceOnUse">
                <rect width="1007" height="615" fill="black" />
                <path
                  ref={aRightMaskRef}
                  d={aRightSpine}
                  fill="none"
                  stroke="white"
                  strokeWidth="60"
                  strokeLinecap="square"
                />
              </mask>
            </defs>

            {/* Architectural Drafting Pen Hairline Guides (visual guide strokes during drawing) */}
            <g id="drafting-guides" aria-hidden="true">
              <path
                ref={sGuideStrokeRef}
                d={sSpinePath}
                fill="none"
                stroke={LOGO_PATHS.colors.black}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="4 3"
                opacity="0"
              />
              <path
                ref={aLeftGuideRef}
                d={aLeftSpine}
                fill="none"
                stroke={LOGO_PATHS.colors.gold}
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.5"
              />
              <path
                ref={aRightGuideRef}
                d={aRightSpine}
                fill="none"
                stroke={LOGO_PATHS.colors.gold}
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.5"
              />
            </g>

            {/* 1. S Monogram Group (Masked Architectural Pen Stroke Reveal) */}
            <g className="s-reveal-group" mask="url(#s-stroke-mask)">
              <path
                d={LOGO_PATHS.sMonogram}
                fill={LOGO_PATHS.colors.black}
                fillRule="evenodd"
              />
            </g>

            {/* 2. A Monogram Group (Constructed from dual diagonal strokes) */}
            <g className="a-reveal-group">
              {/* Left diagonal arm of A */}
              <g mask="url(#a-left-mask)">
                <path
                  d={LOGO_PATHS.aMonogram}
                  fill={LOGO_PATHS.colors.gold}
                  fillRule="evenodd"
                />
              </g>
              {/* Right diagonal arm of A */}
              <g mask="url(#a-right-mask)">
                <path
                  d={LOGO_PATHS.aMonogram}
                  fill={LOGO_PATHS.colors.gold}
                  fillRule="evenodd"
                />
              </g>
            </g>

            {/* 3. Gold Horizontal Line Group */}
            <g className="gold-line-group">
              <path
                ref={goldLineRef}
                d={LOGO_PATHS.goldLine}
                fill={LOGO_PATHS.colors.gold}
                fillRule="evenodd"
              />
            </g>

            {/* 4. Brand Name Group ("SHAN ARCH STUDIO") */}
            <g className="brand-name-group">
              <path
                ref={brandNameRef}
                d={LOGO_PATHS.brandName}
                fill={LOGO_PATHS.colors.black}
                fillRule="evenodd"
              />
            </g>

            {/* 5. Tagline Group ("DESIGN. BUILD. INSPIRE.") */}
            <g className="tagline-group">
              <path
                ref={taglineRef}
                d={LOGO_PATHS.tagline}
                fill={LOGO_PATHS.colors.gold}
                fillRule="evenodd"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
