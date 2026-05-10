// Central GSAP entry point. Importing this module guarantees ScrollTrigger
// is registered exactly once. Components/hooks should import { gsap, ScrollTrigger }
// from here instead of from 'gsap' / 'gsap/ScrollTrigger' directly.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
