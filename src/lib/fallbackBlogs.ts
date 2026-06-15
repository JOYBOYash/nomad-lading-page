import { BlogPost } from "../types/blog";

export const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: "announcing-nomad-beta",
    title: "Introducing Nomad: The Ultimate Productivity Canvas",
    description: "Discover how we are building the future of modular workspaces and personal flow. The public beta is officially open to creators worldwide.",
    content: `We are thrilled to pull back the curtain on Nomad—a productivity workspace designed to bring complete harmony back into your work. 

In a world filled with constant notifications, fragmented tabs, and noisy collaboration tools, finding a moment of true focus has become a rare luxury. Nomad changes this by transforming your digital landscape into a single, cohesive canvas.

### Why Nomad?
Nomad isn't just another task manager or documentation tool. It is an ambient productivity environment that adapts to your creative state:
1. **Linear Workflows**: Center your active tasks and eliminate background clutter automatically.
2. **Modular Components**: Drag, drop, and configure panels for notes, links, track lists, and timers to fit your unique style.
3. **Calm Design Aesthetics**: Styled in deep charcoal tones with soft, eye-safe glowing accents, Nomad keeps your visual field calm and focused.

Our public beta is now live. We invite writers, developers, designers, and thinkers of all kinds to step into their flow and experience a new standard of productivity.`,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
    authorName: "Nomad Core Team",
    createdAt: { seconds: 1718434800 },
    socialLinks: {
      x: "https://x.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: "mastering-your-flow-state",
    title: "Mastering Your Flow: Curated Exercises for Concentrated Deep Work",
    description: "Modern work culture is filled with intentional distractions. Learn our top techniques to enter deep mental concentration and sustain high motivation.",
    content: `Focus is not just a passive ability—it is a cognitive muscle that must be consistently warmed up and exercised. 

Many creators complain that they "can't focus" anymore, but the truth is their environments are structured to actively fragment their attention. Here is how you can train your brain to achieve deep work:

### 1. The 90-Minute Focus Sprint
Human brains naturally transition through ultradian rhythms of high-frequency alertness followed by a dip. Try committing to single-task focus blocks of strictly 90 minutes. Do not open a new browser tab, do not check your phone, and do not look at messages.

### 2. Environmental Cues with Audio Anchors
Set a regular ritual whenever you sit down to work. Play a specific synth loop, lower your lighting, or toggle Nomad to your preferred minimalist preset. By associating distinct ambient triggers with focus, you program your mind to rapidly enter a creative state.

### 3. Progressive Distraction Elimination
Instead of trying to lock yourself away in complete isolation, systematically silence specific, high-risk notifications. Start by turning off chat badges, then progress to putting your phone in another room. By reducing temptation, your attention naturally aligns with the task at hand.`,
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800",
    authorName: "Nomad Design Lab",
    createdAt: { seconds: 1718521200 },
    socialLinks: {
      x: "https://x.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: "conquering-the-multitasking-illusion",
    title: "Conquering the Illusion: Why Multitasking is Draining Your Ideas",
    description: "Multitasking is often praised as efficiency, but neuroscience reveals it destroys creative depth. Discover how Nomad restores single-task clarity.",
    content: `We are taught to praise multitasking as the gold standard of high productivity. We pride ourselves on having dozens of tabs open, texting while editing a spreadsheet, and taking calls during design reviews.

But modern cognitive neuroscience is clear: **Humans cannot multi-task. We can only task-switch.**

### The Attention-Switching Tax
Every time you toggle between writing an article and checking a chat message, your brain has to reload a different set of context rules. This is called *attention residue*. 

When you switch back to your main task, part of your attention remains stuck on the message you just read. This mental drag drains your energy and prevents you from thinking deeply enough to generate truly original ideas.

### Restoring Cognitive Flow
Nomad’s design is inspired by the need to conquer this switching tax. By hiding background panels, centering active components, and giving you single-view immersion, Nomad creates a digital sanctuary where you can explore a single idea to its absolute limit without distraction.`,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
    authorName: "Nomad Research",
    createdAt: { seconds: 1718607600 },
    socialLinks: {
      x: "https://x.com",
      linkedin: "https://linkedin.com"
    }
  }
];
