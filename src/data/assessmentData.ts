export interface Answer {
  text: string;
  points: number;
  stage: 'START' | 'STOP' | 'ELDER' | 'HUMAN';
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "How often do you feel emotionally drained after a shift?",
    answers: [
      { text: "Rarely — I still feel energized most days", points: 1, stage: 'START' },
      { text: "Sometimes — certain days hit harder than others", points: 2, stage: 'STOP' },
      { text: "Often — I carry the weight home with me", points: 3, stage: 'ELDER' },
      { text: "Almost always — I feel numb before I even clock in", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 2,
    question: "When someone asks 'how are you?', what's your honest answer?",
    answers: [
      { text: "\"I'm good, genuinely\"", points: 1, stage: 'START' },
      { text: "\"I'm fine\" — but I know I'm not fully honest", points: 2, stage: 'STOP' },
      { text: "\"I'm tired\" — and I mean it at a soul level", points: 3, stage: 'ELDER' },
      { text: "I don't even know anymore — I've lost track of how I feel", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 3,
    question: "How do you feel about the work you chose?",
    answers: [
      { text: "I still love it — the hard days are worth it", points: 1, stage: 'START' },
      { text: "I believe in it, but the system is wearing me down", points: 2, stage: 'STOP' },
      { text: "I question whether I can keep doing this", points: 3, stage: 'ELDER' },
      { text: "I feel trapped — I don't know who I am without this career", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 4,
    question: "What happens when you have time off?",
    answers: [
      { text: "I recharge and come back ready", points: 1, stage: 'START' },
      { text: "I need the first day just to decompress", points: 2, stage: 'STOP' },
      { text: "Time off doesn't feel like enough — I'm still exhausted", points: 3, stage: 'ELDER' },
      { text: "I dread going back before the time off even starts", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 5,
    question: "How connected do you feel to the people around you?",
    answers: [
      { text: "I have strong relationships that sustain me", points: 1, stage: 'START' },
      { text: "I'm present but sometimes feel distant", points: 2, stage: 'STOP' },
      { text: "I've been pulling away — it takes too much energy", points: 3, stage: 'ELDER' },
      { text: "I feel alone even in a room full of people", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 6,
    question: "When was the last time you did something just for yourself?",
    answers: [
      { text: "This week — I make it a priority", points: 1, stage: 'START' },
      { text: "I can't remember exactly, maybe a few weeks ago", points: 2, stage: 'STOP' },
      { text: "Months — I keep saying I will but never do", points: 3, stage: 'ELDER' },
      { text: "I don't even know what I'd do for myself anymore", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 7,
    question: "How would you describe your sense of who you are outside of your job?",
    answers: [
      { text: "I have a full life and identity beyond my career — it's part of me, not all of me", points: 1, stage: 'START' },
      { text: "I struggle to describe myself without mentioning my job title", points: 2, stage: 'STOP' },
      { text: "When I imagine leaving my career, I genuinely don't know who I'd be", points: 3, stage: 'ELDER' },
      { text: "My career has become my entire identity — and the thought of losing it feels like dying", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 8,
    question: "What's your relationship with sleep?",
    answers: [
      { text: "I sleep well most nights", points: 1, stage: 'START' },
      { text: "I have trouble falling asleep — my mind races", points: 2, stage: 'STOP' },
      { text: "I wake up tired no matter how much I sleep", points: 3, stage: 'ELDER' },
      { text: "Sleep feels like my only escape — or I can't sleep at all", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 9,
    question: "How do you feel about asking for help?",
    answers: [
      { text: "I'm comfortable asking when I need it", points: 1, stage: 'START' },
      { text: "I know I should, but I usually push through alone", points: 2, stage: 'STOP' },
      { text: "Asking for help feels like admitting failure", points: 3, stage: 'ELDER' },
      { text: "I've stopped believing anyone can help", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 10,
    question: "What does your inner voice sound like most days?",
    answers: [
      { text: "Encouraging — I'm doing my best", points: 1, stage: 'START' },
      { text: "Mixed — some days kind, some days critical", points: 2, stage: 'STOP' },
      { text: "Mostly critical — I should be doing more, doing better", points: 3, stage: 'ELDER' },
      { text: "Silent or cruel — I've stopped listening to myself", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 11,
    question: "When you think about your future, what do you feel?",
    answers: [
      { text: "Hopeful — there's a path forward", points: 1, stage: 'START' },
      { text: "Uncertain — I don't have a clear picture", points: 2, stage: 'STOP' },
      { text: "Anxious — I can't see past the next shift", points: 3, stage: 'ELDER' },
      { text: "Empty — I've stopped imagining a future", points: 4, stage: 'HUMAN' },
    ],
  },
  {
    id: 12,
    question: "Why did you take this assessment today?",
    answers: [
      { text: "Curiosity — I want to check in with myself", points: 1, stage: 'START' },
      { text: "I've been feeling off and wanted to understand why", points: 2, stage: 'STOP' },
      { text: "Someone I trust suggested I might be burned out", points: 3, stage: 'ELDER' },
      { text: "I'm desperate — I need something to change", points: 4, stage: 'HUMAN' },
    ],
  },
];

export interface StageResult {
  stage: 'START' | 'STOP' | 'ELDER' | 'HUMAN';
  title: string;
  subtitle: string;
  description: string;
  nextStep: string;
  icon: 'footprints' | 'hand' | 'compass' | 'heart';
}

export const stageResults: Record<'START' | 'STOP' | 'ELDER' | 'HUMAN', StageResult> = {
  START: {
    stage: 'START',
    title: "You're in the START stage",
    subtitle: "The Awareness Walk",
    description: "You're still standing. The cracks haven't become canyons yet — but you're noticing them. This is the most powerful place to be, because awareness is where healing begins. Most people in healthcare ignore the early signs until it's too late. You didn't. The crosswalk is ahead of you — and you have time to cross it on your own terms.",
    nextStep: "Journal for 5 minutes after your next shift. Write down one thing that drained you and one thing that filled you up. Awareness is the first lesson of the crosswalk.",
    icon: 'footprints',
  },
  STOP: {
    stage: 'STOP',
    title: "You're in the STOP stage",
    subtitle: "The Pause",
    description: "You've hit the yellow light. Something in you is saying 'wait' — and you're listening, even if the world around you keeps moving. This stage is uncomfortable because you're caught between what you've been doing and what you know you need. The old coping mechanisms aren't working anymore, but you haven't found new ones yet. This is not a failure. This is the pause before the turn. Every healing journey has this moment — the moment you stop pretending you're fine.",
    nextStep: "Choose one thing to say 'no' to this week. One meeting, one extra shift, one obligation that isn't yours to carry. The pause is where healing starts. If you want to go deeper, the Fear Audit (crosswalkwisdom.com) will show you exactly which fear is keeping you stuck — financial, judgment, or identity.",
    icon: 'hand',
  },
  ELDER: {
    stage: 'ELDER',
    title: "You're in the ELDER stage",
    subtitle: "The Seeking",
    description: "You're looking for answers outside yourself because the answers inside feel depleted. This is the stage where people reach for books, podcasts, coaches, therapists — anything that might show them a way through. You're not weak for seeking. You're wise. The 'Elder' stage is named for the act of looking to those who've walked this road before you. The crosswalk is right in front of you now. You don't have to figure out how to cross it alone.",
    nextStep: "Find one person who has navigated burnout and ask them one question. A mentor, a coach, a colleague who left and came back whole. You don't need all the answers — just the next one. The Courage to Choose guide (crosswalkwisdom.com) was written for exactly this stage — a practical, honest map from someone who actually left medicine and built something new.",
    icon: 'compass',
  },
  HUMAN: {
    stage: 'HUMAN',
    title: "You're in the HUMAN stage",
    subtitle: "The Reckoning",
    description: "You've reached the place where the armor comes off. This isn't rock bottom — it's the moment of radical honesty. You're no longer the job title, the caregiver, the one who holds it together. You're a human being who has given more than they had to give. This stage feels like the end, but it's actually the beginning. The crosswalk isn't ahead of you anymore — you're standing on it. The only direction left is forward. And you don't have to walk alone.",
    nextStep: "You don't need another tip. You need a path and someone to walk it with. Start with The Courage to Choose — a $27 guide and AI prompt pack built for healthcare workers at exactly this moment. It was written by someone who stood where you're standing and found a way through. Get it at crosswalkwisdom.com.",
    icon: 'heart',
  },
};

export function calculateStage(answers: number[]): StageResult {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / answers.length;

  if (averageScore >= 1.0 && averageScore <= 1.7) {
    return stageResults.START;
  } else if (averageScore >= 1.8 && averageScore <= 2.5) {
    return stageResults.STOP;
  } else if (averageScore >= 2.6 && averageScore <= 3.3) {
    return stageResults.ELDER;
  } else {
    return stageResults.HUMAN;
  }
}
