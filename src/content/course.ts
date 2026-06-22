/**
 * course.ts -- the verbatim course content (Introduction + 8 modules), the
 * readings library, and the performance-strategies content. Transcribed
 * faithfully from docs/references/source-docs/course-layout.txt (the client's
 * source). Download links come from docs/references/source-docs/README.md
 * (8 Canva designs + 1 Google Drive folder).
 *
 * The 2 missing downloads (Module 5 "Guide to writing vows", Module 7 "Tips to
 * calm nerves on the day") have `url: null` so the UI renders a "pending" state.
 * Never fabricate a URL for these.
 *
 * This is the canonical source of the course content; supabase migration 002
 * mirrors this structure so it can optionally be served from the database later.
 * Body text is kept as markdown strings (rendered with react-markdown +
 * remark-gfm). The instructional body is preserved as-written by the client.
 */

export type DownloadKind = "canva" | "drive" | "pending";

export interface CourseDownload {
  /** The resource's real name, used as the DownloadCard label. */
  label: string;
  /** Real public URL, or null for the 2 pending (client-missing) downloads. */
  url: string | null;
  kind: DownloadKind;
}

export interface CourseModule {
  slug: string;
  orderIndex: number;
  /** Card / header title (from page-copy course-shell table). */
  title: string;
  /** Short card blurb / sub-line. */
  subtitle: string;
  /** Estimated time chip, e.g. "~30 min". */
  estTime: string;
  /** The Introduction is flagged so the shell can label it module 0. */
  isIntro?: boolean;
  /** Single swap-point for the lesson video; null until the client supplies one. */
  videoUrl: string | null;
  /** Verbatim body copy, markdown. */
  bodyMd: string;
  downloads: CourseDownload[];
}

export interface ReadingCollection {
  category: string;
  title: string;
  url: string | null;
}

/* ===========================================================================
 * Download links (from README.md resource map) -- single source so a link can
 * be updated in one place.
 * ======================================================================== */
const LINKS = {
  checklist:
    "https://www.canva.com/design/DAGcOBFP1Lk/AMv5c_Yg3NYFPWaIeeR7TQ/edit?utm_content=DAGcOBFP1Lk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  interviewQuestions:
    "https://www.canva.com/design/DAGcOV8Z8O8/GfqevXPlKlKVgpdCJ3tldQ/edit?utm_content=DAGcOV8Z8O8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  ceremonyTemplates:
    "https://drive.google.com/drive/folders/14oM7ZuXjSFuUJ9bta5vcshr2BQGFQmIt?usp=sharing",
  narrativeBuilder:
    "https://www.canva.com/design/DAGxsC9FZ_E/Z7hPS9ETfmAnGYnSpQOrNA/edit?utm_content=DAGxsC9FZ_E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  vowsBlueprint:
    "https://www.canva.com/design/DAGzL9j1cB4/mGEJFPwA2k6SAh7Jh9-BFg/edit?utm_content=DAGzL9j1cB4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  readingsYoungPeople:
    "https://www.canva.com/design/DAGwBhSeQGI/iel33zNS1tfomLnZiT7_Zg/edit?utm_content=DAGwBhSeQGI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  readingsSongLyrics:
    "https://www.canva.com/design/DAGwBctn0uI/Pnz1JuvoWCH1y0piwvsE6A/edit?utm_content=DAGwBctn0uI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  readingsLiterary:
    "https://www.canva.com/design/DAGwBOBF5sA/3Pxz3gxW4kLqYWuy_k2ugA/edit?utm_content=DAGwBOBF5sA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  readingsRomantic:
    "https://www.canva.com/design/DAGwAUQ3ha4/n-s6uyKqES_hTP3vZJNvaQ/edit?utm_content=DAGwAUQ3ha4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  readingsFunny:
    "https://www.canva.com/design/DAGwBK7H6QA/yUkwyAZIgk9Bx_KlR2BycA/edit?utm_content=DAGwBK7H6QA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
} as const;

/* ===========================================================================
 * The readings library (Module 5). 5 Canva collections.
 * ======================================================================== */
export const READINGS: ReadingCollection[] = [
  { category: "Readings", title: "Readings for young people", url: LINKS.readingsYoungPeople },
  { category: "Readings", title: "Song Lyrics", url: LINKS.readingsSongLyrics },
  { category: "Readings", title: "Literary and poetic", url: LINKS.readingsLiterary },
  { category: "Readings", title: "Romantic Readings", url: LINKS.readingsRomantic },
  { category: "Readings", title: "Funny and light-hearted", url: LINKS.readingsFunny },
];

/* ===========================================================================
 * Modules
 * ======================================================================== */
export const MODULES: CourseModule[] = [
  {
    slug: "introduction",
    orderIndex: 0,
    isIntro: true,
    title: "Introduction",
    subtitle: "What you get, how it works, and how to plan your time.",
    estTime: "~20 min",
    videoUrl: null,
    downloads: [{ label: "Checklist", url: LINKS.checklist, kind: "canva" }],
    bodyMd: `Welcome to the Wedding Mates Ceremony Blueprint. This course gives you everything you need to create and deliver a unique, professional-standard wedding ceremony for your friends.

Here's what you have access to:

**8 short videos guiding you step by step.** In these videos you will learn:

- How to interview your couple
- How to write an engaging love story
- How to create a strong story arc and narrative
- How to coordinate the roles of others, weaving in music, readings, and vows so everything feels seamless
- How to use instructions and unspoken prompts to guide the ceremony with ease
- How to deliver it all with confident presentation skills that turn your words into a truly memorable performance

**Templates and tools to help you with the creative process.** You can download interview questions, ceremony structures, and checklists to make the process smooth and ensure you have everything covered.

**A library of readings.** Browse through a collection of readings to personalise your ceremony.

**Performance strategies.** Techniques for staying calm, focussed and ready, even if nerves kick in.

## How to use the course

For each Module there's a short overview video and a more detailed accompanying text. Work through each Module in order, completing the associated task before moving to the next one. Some Modules have downloads with resources that will help you complete the task. When you have completed all of the Modules you will have your wonderful ceremony ready to go and hopefully have had fun during the process.

## What to do if you get stuck

We're here to help. Just message us on email or WhatsApp and you'll get real, human support to keep you on track.

- Email: sarah@letsgetwed.com.au
- WhatsApp: 0410 820 300

## What your role entails

Your job is to focus on creating and presenting a ceremony that feels personal, polished, and heartfelt. This includes organising interaction with other people such as your couple, musicians and readers.

The good news is the legal side is fully handled by us, so you don't need to worry about that or coordinate legal elements on the day.

## How much time to allow

Here's a rough guide of the amount of time you should allocate to complete your wedding ceremony:

- **Course learning:** 2 hours to go through all the videos and resources, completed in stages.
- **Interviewing the couple:** 2 hours.
- **Organising your notes:** 1 hour after the interview.
- **Writing the ceremony:** 2 to 3 hours for your first draft. Allow a 1 to 2 hour session to add the story arc and heart to your ceremony. Allow for 3 short sessions for edits, adding in the roles of other people and marking up your script for inflection and instructions.
- **Practising delivery:** 4 x 20 minute sessions to practice reading your ceremony out loud. Ideally one of these rehearsals should be with a friend for feedback.
- **Final preparations (week of the wedding):** 2 hours to check venue details, prep your outfit, print vows and readings and make sure your script is ready (on cards or device).
- **The day before the wedding:** Run through the checklist and confirm you have everything ready to go.

## Take your time

- The process starts with interviewing your couple. Schedule your interview at least 3 months before the wedding.
- This gives you space for creative flow, tweaks, and completing all the elements of the wedding ceremony.
- Even simple ceremonies have many elements in addition to your words. More time equals less pressure.

Now you've mapped out your timeline, you're ready to dive in. Let's start your first task: book your interview session with your couple. Watch the "Interview" video and download the interview questions.`,
  },
  {
    slug: "module-1-interviewing-your-couple",
    orderIndex: 1,
    title: "Module 1: Interviewing Your Couple",
    subtitle: "Ask the questions that uncover the story behind the facts.",
    estTime: "~30 min",
    videoUrl: null,
    downloads: [
      { label: "Interview Questions Template", url: LINKS.interviewQuestions, kind: "canva" },
    ],
    bodyMd: `In this Module you will learn how to interview your couple and ask the questions that will uncover the beautiful details that will make the ceremony unique, personal, and unforgettable. You'll learn how to turn facts into a captivating story that evokes emotions.

This part will be fun.

## Avoid the common mistake

Many first-time wedding hosts fall into the trap of writing a ceremony like a best man's speech: jokey, surface-level, seen through their eyes and heavy on anecdotes. It's entertaining but doesn't capture the heart of a wedding ceremony. To write a ceremony that lands, you need:

- The right questions
- The right details
- The emotion behind the details

## Interview location and time

- Choose a fun and relaxed venue (a home setting works better than a bar).
- Allow plenty of time, because as friends you'll definitely wander off-topic or down memory lane.

## Conducting the interview

- Take a list of questions so you have a structure to come back to. This will ensure you have enough relevant information for your ceremony script and that it is organised in a way that will make turning your notes into the ceremony easy.
- Let the conversation flow and the story will start to write itself, but keep coming back to your questions.
- Look for emotions, not just events. Get an understanding of how each part of the journey made your couple feel, not just what happened.
- Write everything down, including the bits you already know. Often you won't know exactly what you will include in the ceremony until you start to write it. Having too much information is better than not enough.

## What to ask

Here are topics to start thinking about. You can also find a full list of interview questions and prompts to download to accompany this module.

**Style.** Establish the style your couple envisage for their wedding.

- How long do they want the ceremony (15 to 20 minutes is ideal)?
- What vibe do they prefer? Relaxed, formal, funny, romantic?
- Are there any topics that should be off-limits?
- Can they describe inspiration from weddings they've attended, what they liked or disliked?

**The love story.** Build a picture of how their love story developed.

- Before they met, what were they looking for?
- When they met, first impressions?
- When did it feel serious?
- Milestones: trips, challenges, "sliding doors" moments.

**The proposal.**

- Who proposed?
- How did it happen?
- What was the build-up like?
- How did they both feel in the moment?

**Family.**

- Do they have children?
- What does marriage mean to them as a family?

## Tips

- Notice if your couple remember events differently. Describing those contrasts in experience adds richness and humour and a unique insight into their relationship.
- Your goal isn't to collect facts. It's to uncover the little moments, the feelings, and the stories that make their relationship shine. That's what will bring the ceremony to life.
- Don't shy away from small bumps in the road (handled gently, they make the story more human).
- Take lots of notes. Too many is fine. Too few will leave you stuck later.
- Authenticity beats perfection every time. Let the experience dictate the story.

Now you have learnt how to get the best out of your couple's pre-wedding interview you can schedule your first meeting. Write a list of questions or download the interview questions template. When you have completed your interview, move on to Module 2: Structuring the Ceremony and the Welcome.

## Downloads

You can download the Interview Questions Template to print out or keep it on your phone. It contains detailed prompts to guide you through an interview.`,
  },
  {
    slug: "module-2-structuring-the-ceremony",
    orderIndex: 2,
    title: "Module 2: Structuring The Ceremony",
    subtitle: "Map every element, from the welcome to the walk-out.",
    estTime: "~30 min",
    videoUrl: null,
    downloads: [
      { label: "Wedding ceremony template 1 & 2", url: LINKS.ceremonyTemplates, kind: "drive" },
    ],
    bodyMd: `In this Module you will learn all the elements of a wedding ceremony.

In addition to writing the couple's love story you will need to plot out the structure of your ceremony to include the following elements:

- Location details
- Arrivals logistics and where everyone stands
- Information for the introduction and welcome
- All other people involved in the ceremony for music, readings, vows, rituals etc

## Follow this structure for planning your ceremony

- Notes: location details
- A welcome and introduction, passing on important information
- Introduce the bridal party and cue the processional
- Tell your couple's love story, part 1
- Add reading or readings from other guests (we will cover this later)
- Tell your couple's love story, part 2
- Introduce the couple's vows and hand over to your couple to read them
- Exchange of rings
- Conclusion and celebration of the union
- Wrap-up information and walk out (recessional)

## The welcome

Below is a guide for how to structure your welcome and introduction. This happens when you are nearly ready for the wedding to start, before the bride is introduced.

**Introduce yourself.** Lots of people at the wedding will know you, but they might not expect to see you standing up front as the one leading the ceremony. Begin by introducing yourself: who you are to the couple, and why you've been given the honour of standing there today.

**Pre-wedding housekeeping.** Make sure everyone can hear you, remind guests to switch off their phones and explain the photo policy. Most couples prefer no phones or filming during the ceremony, though, let's be honest, there's always one person who can't resist. If there are any more instructions, add them here.

**Set the tone.** Put the guests at ease, because the more relaxed they are, the more energy and warmth you'll feel from them and that will help you relax too. Tell them they all look amazing. Encourage them to laugh, cheer, cry and really feel the moment with the couple.

**Here's the bonus.** A couple of minutes speaking into the microphone and you'll settle in and start to feel nerves dissipating. In my experience, from there you'll start to enjoy yourself as much as everyone else.

Use this information to complete the structure of your ceremony and write your introduction, then move on to Module 3: Writing Your Love Story.

## Downloads

You can download wedding ceremony templates to use to structure your ceremony.`,
  },
  {
    slug: "module-3-writing-your-love-story",
    orderIndex: 3,
    title: "Module 3: Writing Your Love Story",
    subtitle: "Turn your interview notes into a first draft that flows.",
    estTime: "~30 min",
    videoUrl: null,
    downloads: [
      { label: "The Narrative Builder", url: LINKS.narrativeBuilder, kind: "canva" },
    ],
    bodyMd: `In this Module you will learn how to turn the information from the interview into a first draft of your wedding ceremony script.

The ceremony is the first part of the wedding day and your words will set the tone for the entire day. Design them to make your couple feel celebrated and their love honoured. A great ceremony will be entertaining, interesting, and funny, but remember that this isn't the best man's speech. This is the heart of the wedding day.

You can use the structure below to see how to organise your notes into a ceremony. At the end of this module there is a Narrative Builder with a detailed list of prompts you can download to help you write the love story.

**1. Start with the meet-cute.** Where were they in their lives when they met? What were they looking for? How did they first meet, and what were their first impressions of each other? How did meeting make them feel? This sets the scene with who they were individually before they met and foreshadows their union.

Then move on to the first date: who made the move, where did they go, and how did it go? What did each of them think afterwards? Start to introduce the things that initially attracted them to each other, or recurrent themes of the relationship. These can be referred back to later as the things they still love about each other, or to show how relationships change over time but some things remain.

**Next, move into the relationship highlights.** How did things progress from there? What brought them closer? Pick out key moments that cemented their commitment rather than chronological events. Highlight why they're suited: what did they find in each other that was truly special? How do they balance or complete one another? This is a chance to make your couple the heroes of their love story.

**Then, the turning point.** Was there a specific moment they knew this was the real thing? The first "I love you"? A trip, a challenge, or maybe just the quiet realisation they never wanted to be apart. This is the build-up to the proposal. You can also add jeopardy here if appropriate to the story.

**Finally, the proposal.**

The build-up:

- Who decided it was time to get engaged?
- Was someone hinting? Did they plan it together? Or did one pull off a complete surprise?
- Was there a ring? How was it chosen? Who helped?
- Did it reflect something about their personalities, like the one who's always late nearly being late to their own proposal?

On the day:

- Did everything go to plan? (Spoiler: it rarely does.)
- Were there nerves, funny little mishaps, or unexpected twists?
- And then, the big moment.
- How did they feel? What emotions were written across their faces? The nerves, the surprise, the joy, the relief, that's what you want to capture.

This is your big emotional high point. It's the climax of their love story, and it should feel that way, so build towards it and make your guests feel the emotion. It's not uncommon to get a few tears here (maybe even your own).

Now you've learnt a way to craft the story of your couple's journey that flows. Once you have a first draft you are happy with, take a break from it then move on to Module 4 where we'll add heart and personality to your ceremony.

## Downloads

You can download the Narrative Builder prompts to help you craft the first draft of your story.`,
  },
  {
    slug: "module-4-adding-heart-and-personality",
    orderIndex: 4,
    title: "Module 4: Adding Heart And Personality",
    subtitle: "Edit with fresh eyes and turn facts into feelings.",
    estTime: "~25 min",
    videoUrl: null,
    downloads: [],
    bodyMd: `You now have the structure of the story. In this Module I'll guide you through adding heart and personality to the ceremony.

Do this on a different day from the first draft so you look at it with fresh eyes and fresh enthusiasm.

Before you start writing the second draft of the love story, try this exercise:

- Pause for a moment and picture your couple's love story as a film.
- What genre fits them best?
- A rom-com full of playful moments?
- A sweeping, old-fashioned romance?
- A quirky indie story, unexpected and original?
- Now, imagine them as the heroes of that film. Imagine you are the narrator of the plot. This will help you edit your story consistently.

Now follow the steps below to add emotion and personality to your ceremony.

## Edit with purpose

Read through and see if you are happy with the length. If your first draft is too long, now is the time to cut it down. Ask yourself if all of the parts of your story are interesting and relevant. Make your ceremony feel like a celebration, not a biography. Ask yourself if you have captured emotions as well as events. Can the events you describe be written about in a more interesting way?

Here's an example of adding extra interest and emotion when describing the same event:

1. "Julie and Dave had their first date at Angus Steakhouse" = fact.
2. "Dave, eager to impress Julie on their first date, took her to his favourite steakhouse, even though it was a little pricey. Julie, just as nervous and keen to impress Dave, kept quiet about the fact that she was vegetarian." = story.

## Look for a theme

Having a theme to tie together your story is a useful narrative tool to make the parts of your ceremony flow without using chronological order of events. Skim through your ceremony and ask yourself if you see a natural thread that connects the story. For example, were they always destined to meet? Does their journey feel like a silly rom-com? Did key moments always fall at the same time of year?

## Dig deeper

If you feel the story needs more heart, call each partner individually. Ask them about the emotions behind the milestones. Couples often struggle to say "why I love you" when sitting side by side, but privately, they say more. These insights can become the most powerful part of the ceremony.

Think of this step as transforming facts into feelings. It's where a story stops being just "their history" and becomes their love story.

## Add personality

Lots of people can write a wedding ceremony, but no one can write it with your personality, because they are not you.

Now that you've got the outline of the ceremony, think about how you're going to tell it. This is where your personality comes in.

**Audit your tone.** Make sure you have a positive tone on the story. This is a love story. Yes, you will want your ceremony to be entertaining and interesting. But remember, this isn't the speeches section of the day.

Think of your couple as the heroes of a love story. They're the leading man and woman in a rom-com, the prince and princess in their own fairytale. Your words should first and foremost make them feel good, and make their love feel celebrated.

You set the tone for the whole day, and that tone should always come back to their love. So, as you go through your ceremony, check in with yourself: is what you've written true to that? Especially when it comes to humour. The jokes should always be about laughing with the couple, never at one of them.

Once you have completed the tasks above you will have a final draft of the story part of your ceremony and you can move on to Module 5 to add in readings, music and vows.`,
  },
  {
    slug: "module-5-music-readings-and-vows",
    orderIndex: 5,
    title: "Module 5: Music, Readings And Vows",
    subtitle: "Add the finishing touches that make it personal.",
    estTime: "~30 min",
    videoUrl: null,
    downloads: [
      // PENDING: the client has not supplied the "Guide to writing vows" link.
      // url: null renders a flagged "Coming soon" card. Do NOT fabricate a URL.
      { label: "Guide to writing vows", url: null, kind: "pending" },
    ],
    bodyMd: `With the creative writing complete, this is where we add the beautiful finishing touches: the music, the readings, the rituals, and of course, the vows.

In this Module you'll learn what other elements can be personalised in the ceremony and where to add them in. Read the information below then reach out to your couple to discuss their preferences.

## Music

Ask your couple if they would like a playlist on while guests are waiting for proceedings to get started. Ask your couple to pick a piece of music for the start of the ceremony that the bridal party walks in to, and a piece of music for the end of the ceremony that the couple will walk out to.

If your couple has live music, get in contact with the people providing the music and introduce yourself. You will cue them when to play the tracks. If the track is being played through a speaker, make sure you know who is responsible for this and how you will cue them at the right time.

## Readings

Readings are a beautiful way to bring extra meaning, personality, and connection into a wedding ceremony. Whether romantic, spiritual, funny, or sentimental, a well-chosen reading can reflect the couple's values and deepen the emotional tone.

It is also a great way to break up parts of the ceremony so that you can move through the couple's story. And it gives you a break from feeling like you are speaking a very long monologue. Your couple can select the readings, or they can ask the reader to select them.

A good reading should feel aligned with the couple and the overall tone of the ceremony. Options include:

- Excerpts from poetry or literature
- Lyrics from a meaningful song
- Passages from spiritual or religious texts
- Movie quotes or dialogue (done well, this can be memorable)
- A story or letter written specifically for the couple
- Cultural traditions or ancestral blessings

Make contact with the readers and let them know you will call them up when it is their time to speak. Brief them on how the microphone works and ask them if they will have a copy of their reading printed.

You'll find a full readings library in the Resources section to share with your couple for inspiration.

## Rituals

Some couples like to incorporate a ritual in their ceremony (although less often than the wedding celebrant textbooks would have you believe). If your couple want to do this, or honour a part of their heritage by customising their ceremony in some way, you can add in a ritual. You'll find lots of inspiration for this online.

## Vows

The vows are the emotional heart of the wedding ceremony. Your role is to create space for these words to land with meaning, ease, and authenticity.

Often couples will shy away from the vows. It's not every day you stand before a big group of people and share your intimate feelings. It can be nerve-wracking, but in my experience couples never regret writing their own vows. I've included a template and tips on writing vows.

You now have a version of your ceremony with all the elements. You can move on to Module 6 to learn how to add instructions and prompts to your ceremony.

## Downloads

You can download the guide to writing vows here. Access inspiration for readings in the Readings Library.`,
  },
  {
    slug: "module-6-prompts-and-other-people",
    orderIndex: 6,
    title: "Module 6: Prompts And Other People",
    subtitle: "Cue music, readers, and the kiss so the day flows.",
    estTime: "~25 min",
    videoUrl: null,
    downloads: [
      { label: "The ultimate vows blueprint", url: LINKS.vowsBlueprint, kind: "canva" },
    ],
    bodyMd: `In this Module we will learn how to add into your ceremony the instructions and prompts for other people, so everything flows smoothly on the day.

Start by making a list of everyone who you know will play a role in the ceremony alongside you. Add in the names of the people and the practical instruction for each of the roles listed below.

## Arrivals coordinator

This is the person who will let you know when the bride is arriving and then when she is in position, so you can start the ceremony. Make a note that when you are told the bride is 5 to 10 minutes away you will seat everyone and do a general introduction. Make a second note that when the bridal party are in position to do their entrance you will cue the music, introduce the bride and start the ceremony.

## Music operator or live musician

This is the person responsible for playing music during the ceremony. There are two key moments to prepare for when music will be played and guests will stand and sit.

**1. Before the bride's entrance:**

- Make a note to signal to the person playing the music to play the entry track to start the music.
- Invite guests to stand to welcome the bridal party.
- When the bride is in position, make a note to ask guests to be seated and the music operator to fade out the music (forget this and the guests will awkwardly stand for the whole ceremony, or until you remember).

**2. After the ceremony is complete:**

- Make a note to ask guests to stand and to cue the walk-out music. If the wedding has confetti, bubbles etc for the walk out, make a note to tell guests what to do with it for the walk out.

## Readers

If your ceremony incorporates readings you will need to call your speakers up and introduce them. Make a note of their name and the name of their reading. Make a note to pass them the microphone.

## Your couple

Make a note to invite your couple to say their vows and to pass them the microphone. If they are exchanging rings at the same time you will need to call the ring bearer to the front to present the rings.

At the end your couple are going to seal their union with a kiss. Make a note at the very end of your ceremony to introduce the kiss. You can use a line like:

> OK, get ready to cheer, because it gives me great pleasure to celebrate our newlyweds [name 1] and [name 2]!

When you have completed all your instructions you will have your finished ceremony. The final step is to get confident with delivering your ceremony. When you are ready you can move to Module 7: Presentation, How to Deliver the Ceremony with Confidence.`,
  },
  {
    slug: "module-7-delivering-with-confidence",
    orderIndex: 7,
    title: "Module 7: Delivering With Confidence",
    subtitle: "Pace, nerves, and presence. The part you secretly fear, sorted.",
    estTime: "~35 min",
    videoUrl: null,
    downloads: [
      // PENDING: the client has not supplied the "Tips to calm nerves" link.
      // url: null renders a flagged "Coming soon" card. Do NOT fabricate a URL.
      { label: "Tips to calm nerves on the day of your ceremony", url: null, kind: "pending" },
    ],
    bodyMd: `With the writing done, it's time to master the delivery. In this Module, you'll discover how to speak with confidence, using pace and inflection for impact, calming nerves, engaging guests, and presenting with warmth and ease.

## Practice makes confident

- Rehearse your words and your pace. It's easy to speed up without noticing. Slow yourself down. Speak clearly and leave pauses so your words can land.
- Add marks in your script as prompts for your delivery. Add ellipses where you want to pause, and bold or italicise words you want to emphasise. Inflection, pauses and pace transform a ceremony from a flat reading into something engaging and memorable that the guests feel as well as hear.
- Film yourself speaking the ceremony. Watching yourself back is one of the best ways to spot habits, rushed sections, or tricky pronunciations. Edit your script if something keeps tripping you up.
- Test it with a friend. Practising in front of real people feels different from practising in the mirror. Get comfortable speaking in front of people.

## Handling nerves

Nerves don't have to get the better of you and throw off your performance. Pop these techniques in your phone notes and use them before the ceremony starts if you are feeling nervous.

- **Reframe nerves as excitement.** Your body reacts the same way to nerves and excitement, so when you feel nerves about what can go wrong, tell yourself that it's your body getting excited about how great it will be. Picture the best-case scenario and focus on that.
- **Use your breath.** While you are waiting for the bride to arrive, try the 3-3-3 breathing method: inhale for 3 seconds, hold for 3, exhale for 3. This slows your body down and calms your mind.
- **Find a friendly face.** Ask a friend to give you a little smile of encouragement when you look to them during the ceremony. On seeing the smile your brain will release feel-good chemicals dopamine and serotonin, which will lower stress and boost confidence.
- **Ground yourself.** Remind yourself: "The ceremony doesn't need to be perfect. After the first few lines, I'll find my rhythm." Believe in yourself. Your couple do, that's why they asked you.

## Engaging with the couple and guests

Presenting well requires more than just speaking the words. Your energy and engagement with the guests is also important.

- **Make eye contact with the guests.** Look up from your notes regularly to engage with the guests. If looking at the whole crowd feels scary, pick three spots in the space and rotate between them. It gives the illusion of full eye contact.
- **Talk directly to the couple.** Take moments to look at your friends and smile while you speak. Smiling is a great presentation hack, because when you smile (even a forced smile) it sends signals to your brain that trigger the release of endorphins and serotonin (the body's natural mood boosters). It also triggers guests' serotonin.
- **Bring the vibes.** If you present with buoyant energy it ripples through the room and relaxes the guests. The more they feel your energy, the more they enjoy themselves and the more energy they give back. That energy grows. Presenting to a crowd that is relaxed and enjoying themselves feels so much better than presenting to a quiet, flat crowd.

## Look the part

You will feature in lots of photos, so make yourself centre-stage worthy.

- Offer the couple a few outfit options to make sure your style and colour scheme matches their expectations.
- Plan ahead. Make sure your outfit is clean, pressed, and has a backup just in case.
- Choose practical shoes. Stilettos plus soft grass equals wobbly celebrant (trust us).
- Hold your script well. Keep your script at chest height, slightly away from your body so you are looking out, not down. This posture minimises the photos which make you look like you have a double chin.
- Printed vs digital. If you're printing your script, use thick paper so pages don't flop around. Format your document so you're not turning a page mid-sentence.

## Handling the unexpected

Things don't always go to plan: music cues, tech issues, weather, or emotions. The best approach is to own the mistake, get back on track and carry on.

- Lost your place? Tell people, take a second, and find it again.
- Sound system crashes? Restart it.
- Feeling a rush of emotions? Shed a tear, it only makes the moment more powerful.

Guests love a real, human moment. A slip-up often makes the ceremony even more memorable, so don't stress.

## One final thought

You were asked to do this because your couple trusts you. You don't need to be a polished professional. Just do your best, speak from the heart, stay calm, and be there for them. That's what makes a ceremony unforgettable.

## Download

Tips to calm nerves on the day of your ceremony.`,
  },
  {
    slug: "module-8-the-wrap-up",
    orderIndex: 8,
    title: "Module 8: The Wrap Up",
    subtitle: "A recap, your final checklist, and you are ready.",
    estTime: "~15 min",
    videoUrl: null,
    downloads: [],
    bodyMd: `We've reached the end of the course. Let's take a moment to recap what you've learned:

- How to interview your couple and draw out the details that make their story unique.
- How to shape that information and write an engaging love story.
- How to create a strong story arc and narrative, adding emotion, tension, and heart to the ceremony.
- How to coordinate the roles of others, weaving in music, readings, and vows so everything feels seamless.
- How to use instructions and unspoken prompts to guide the ceremony with ease.
- How to deliver it all with confident presentation skills that turn your words into a truly memorable performance.

You are ready to present the most personal and unique wedding ceremony and create memories that will last forever. Use the final section of the checklist downloaded in Module 1 to make sure you have everything prepared for the big day, and go and do something amazing.`,
  },
];

/* ===========================================================================
 * Performance strategies -- the calm-nerves / delivery techniques pulled out of
 * Module 7 into a standalone Resources surface (/course/strategies). Same
 * client source text, regrouped as quick-reference cards.
 * ======================================================================== */
export interface PerformanceStrategy {
  title: string;
  body: string;
}

export const PERFORMANCE_STRATEGIES: PerformanceStrategy[] = [
  {
    title: "Reframe nerves as excitement",
    body: "Your body reacts the same way to nerves and excitement. When you feel nerves about what could go wrong, tell yourself it's your body getting excited about how great it will be. Picture the best-case scenario and focus on that.",
  },
  {
    title: "Use the 3-3-3 breath",
    body: "While you wait for the bride to arrive, inhale for 3 seconds, hold for 3, exhale for 3. This slows your body down and calms your mind.",
  },
  {
    title: "Find a friendly face",
    body: "Ask a friend to give you a little smile of encouragement when you look to them. Seeing the smile releases dopamine and serotonin, which lowers stress and boosts confidence.",
  },
  {
    title: "Ground yourself",
    body: "Remind yourself: the ceremony doesn't need to be perfect. After the first few lines, you'll find your rhythm. Your couple believe in you, that's why they asked you.",
  },
  {
    title: "Pick three spots for eye contact",
    body: "If looking at the whole crowd feels scary, pick three spots in the space and rotate between them. It gives the illusion of full eye contact.",
  },
  {
    title: "Smile on purpose",
    body: "Smiling, even a forced smile, sends signals to your brain that release endorphins and serotonin. It also triggers the guests' serotonin, so the room warms up with you.",
  },
  {
    title: "Bring the vibes",
    body: "Present with buoyant energy and it ripples through the room. The more the guests feel your energy, the more they give back, and that energy grows.",
  },
  {
    title: "Own the unexpected",
    body: "Lost your place? Tell people, take a second, find it again. Sound system down? Restart it. A rush of emotion? Shed a tear, it only makes the moment more powerful. A slip-up often makes the ceremony more memorable.",
  },
];

/* ===========================================================================
 * Convenience selectors
 * ======================================================================== */
export const COURSE_TOTAL_LESSONS = MODULES.length; // Introduction + 8 = 9

export function getModuleBySlug(slug: string): CourseModule | undefined {
  return MODULES.find((m) => m.slug === slug);
}
