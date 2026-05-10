// Central GSAP entry point. Importing this module guarantees ScrollTrigger
// is registered exactly once. Components/hooks should import { gsap, ScrollTrigger }
// from here instead of from 'gsap' / 'gsap/ScrollTrigger' directly.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
