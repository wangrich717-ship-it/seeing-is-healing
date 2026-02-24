/**
 * 引导问题：面向 OH 卡教练，按「提问类型」整理，帮助学会如何发问、深化探索。
 */

export interface GuidingQuestion {
  id: string;
  content: string;
  /** 适用牌阵 slug，可选 */
  spreadSlug?: string;
}

export interface QuestionSection {
  id: string;
  name: string;
  intro: string;
  questions: GuidingQuestion[];
}

/** 按提问类型分组的引导问题，便于教练学习与选用 */
export const QUESTION_SECTIONS: QuestionSection[] = [
  {
    id: "open-observation",
    name: "开放式观察",
    intro: "不评判地邀请对方描述画面，建立安全与联结。避免「你看到了什么意义」等封闭或引导性过强的问题。",
    questions: [
      { id: "q001", content: "你看到了什么？" },
      { id: "q002", content: "画面里有什么？有哪些细节吸引你？" },
      { id: "q143", content: "这张卡里有什么你从未注意过的细节？" },
      { id: "q142", content: "给这张卡起一个名字。" },
      { id: "q301", content: "第一眼你注意到的是什么？" },
      { id: "q302", content: "画面中的色彩、线条或形状，有什么让你有感觉？" },
      { id: "q303", content: "如果这张图会动，你觉得会怎么动？" },
      { id: "q304", content: "画面里有没有让你想靠近或想远离的部分？" },
    ],
  },
  {
    id: "link-life",
    name: "连结与当下",
    intro: "把卡牌与对方此刻的生活、状态连结，让投射落地，避免停留在「卡很准」的层面。",
    questions: [
      { id: "q005", content: "这张卡和最近的你有什么联系？", spreadSlug: "single-card" },
      { id: "q003", content: "画面中你在哪里？在做什么？" },
      { id: "q007", content: "这张卡代表你现在的情绪状态是什么？", spreadSlug: "single-card" },
      { id: "q080", content: "这张卡如何反映「你是谁」？", spreadSlug: "single-card" },
      { id: "q305", content: "此刻的生活里，有什么和这张卡很像？" },
      { id: "q306", content: "这张卡像你生命中的哪一段或哪一个人？" },
      { id: "q307", content: "如果这张卡是今天的你，它在说什么？" },
      { id: "q308", content: "你现在的状态，用这张卡来比喻会是什么？" },
    ],
  },
  {
    id: "timeline",
    name: "时间线：过去·现在·未来",
    intro: "用多张卡或单卡联想，帮助对方看见发展、变化与可能性，适合三卡阵或叙事类牌阵。",
    questions: [
      { id: "q006", content: "你的情绪是如何从过去发展到现在，又将走向哪里？", spreadSlug: "three-card" },
      { id: "q040", content: "这段关系是如何发展的？未来会如何？", spreadSlug: "three-card" },
      { id: "q110", content: "过去、现在、未来三张卡，如何照亮你的选择？", spreadSlug: "three-card" },
      { id: "q150", content: "你的生涯过去、现在与理想未来，分别是什么画面？", spreadSlug: "three-card" },
      { id: "q309", content: "如果过去是这张卡，现在和未来可能是什么样子？" },
      { id: "q310", content: "一年前的你看到这张卡，和现在的你看到，会有什么不同？" },
      { id: "q311", content: "这件事如果继续发展下去，你希望下一张卡是什么画面？" },
    ],
  },
  {
    id: "body-feeling",
    name: "身体与感受",
    intro: "邀请对方把感受落到身体位置或感官，增强觉察、减少纯理性分析。",
    questions: [
      { id: "q121", content: "此刻，你身体里的压力在哪里？" },
      { id: "q102", content: "你的身体现在需要什么？" },
      { id: "q071", content: "在什么情况下你觉得界限被越过了？感觉如何？" },
      { id: "q130", content: "若愿意，这张卡代表的那段经历在身体哪里？", spreadSlug: "cope-trauma" },
      { id: "q312", content: "看着这张卡，你身体哪个部位有反应？" },
      { id: "q313", content: "这种感受如果有一个温度或重量，会是什么？" },
      { id: "q314", content: "你的呼吸现在是什么样的？" },
      { id: "q315", content: "肩膀、胸口或肚子，哪里最想被注意到？" },
    ],
  },
  {
    id: "emotion-deepen",
    name: "情绪命名与深化",
    intro: "在对方愿意的前提下，帮助命名情绪、看见情绪背后的需要或信念，避免说教。",
    questions: [
      { id: "q030", content: "愤怒背后，你真正需要的是什么？", spreadSlug: "single-card" },
      { id: "q031", content: "愤怒底下，是否还有一份受伤或恐惧？" },
      { id: "q032", content: "这股愤怒在保护你什么？" },
      { id: "q010", content: "这张卡与你的焦虑或恐惧有什么联系？", spreadSlug: "single-card" },
      { id: "q014", content: "焦虑在告诉你什么？它在保护你免于什么？" },
      { id: "q020", content: "这张卡如何代表你当前的哀伤或失落？", spreadSlug: "single-card" },
      { id: "q316", content: "如果给此刻的情绪起一个名字，会叫什么？" },
      { id: "q317", content: "这种情绪有多大？如果从 1 到 10，大概是几？" },
      { id: "q318", content: "情绪底下，有没有一份更柔软的需要？" },
      { id: "q319", content: "你允许自己拥有这份情绪吗？" },
    ],
  },
  {
    id: "resource-hope",
    name: "资源与希望",
    intro: "在探索困难之后，适度转向「什么还留着」「什么可以相信」，支持整合与行动。",
    questions: [
      { id: "q022", content: "失去之后，什么还留着？" },
      { id: "q024", content: "带着这份失落，你还能相信什么？" },
      { id: "q013", content: "在这张画面里，能否找到一个让你感到安全的角落？", spreadSlug: "ecco-hope" },
      { id: "q103", content: "什么让你感到滋养与充电？" },
      { id: "q123", content: "什么能帮助你在压力中「充电」？" },
      { id: "q133", content: "今天的你，比当时的你多了什么力量？" },
      { id: "q320", content: "谁或什么曾经给过你类似的支持？" },
      { id: "q321", content: "在这张卡里，有没有一点光或一点温暖？" },
      { id: "q322", content: "你曾经克服过什么，是当时的你没想到的？" },
      { id: "q323", content: "如果有一个内在的智者，他会对现在的你说什么？" },
    ],
  },
  {
    id: "unsaid-expression",
    name: "未竟之语与表达",
    intro: "邀请对方说出没说出口的话、最想被听见的内容，支持表达与边界。",
    questions: [
      { id: "q041", content: "在这段关系里，你最想被听见的是什么？", spreadSlug: "relationship" },
      { id: "q060", content: "你想说却一直没说出口的话，是什么？" },
      { id: "q046", content: "如果对方此刻坐在你面前，你最想说的一句话是什么？" },
      { id: "q021", content: "你还没有来得及说的话，是什么？" },
      { id: "q062", content: "如果完全不怕后果，你会说什么？" },
      { id: "q004", content: "用「我」开头，为这张卡编一段话。" },
      { id: "q324", content: "你最希望对方听懂的是什么？" },
      { id: "q325", content: "如果写一封信却不必寄出，你会写什么？" },
      { id: "q326", content: "有什么是你一直想对自己说的？" },
      { id: "q327", content: "在这段关系里，你真正想要的是理解、陪伴，还是别的？" },
    ],
  },
  {
    id: "future-choice",
    name: "未来与选择",
    intro: "支持对方连接内在智慧、直觉或未来视角，常用于决策、生涯类探索。",
    questions: [
      { id: "q111", content: "如果你已经知道答案，会是什么？" },
      { id: "q114", content: "你的内心已经知道了吗？" },
      { id: "q113", content: "十年后的你，会为今天的哪个选择感到骄傲？" },
      { id: "q112", content: "在这个选择里，你最害怕的是什么？" },
      { id: "q153", content: "如果金钱不是问题，你会做什么？" },
      { id: "q328", content: "如果排除所有人的期待，你真正想选的是哪个？" },
      { id: "q329", content: "哪个选择更靠近「你想成为的样子」？" },
      { id: "q330", content: "你的身体对哪个选项更有反应？" },
      { id: "q331", content: "如果五年后回头看，你希望自己当时怎么选？" },
    ],
  },
  {
    id: "action-change",
    name: "行动与改变",
    intro: "在探索与领悟之后，邀请对方把发现落成具体、可执行的一小步，支持从「看见」到「做到」。不催促、不替代对方做决定，只邀请他为自己选一个愿意尝试的行动。",
    questions: [
      { id: "q201", content: "从今天的探索里，你带走的一个小小的行动或尝试会是什么？" },
      { id: "q202", content: "如果只能做一件事，你最想先做哪一件？" },
      { id: "q203", content: "接下来的一周，你愿意为自己做的一件小事是什么？" },
      { id: "q100", content: "这张卡提醒你要如何照顾自己？", spreadSlug: "single-card" },
      { id: "q204", content: "你打算如何把今天的发现带到生活里？" },
      { id: "q205", content: "如果要迈出一小步，那会是什么？" },
      { id: "q206", content: "你愿意为自己许下一个怎样的承诺？" },
      { id: "q207", content: "明天或接下来几天，你想从哪里开始？" },
      { id: "q208", content: "做什么会让你离「你想要的」更近一点？" },
      { id: "q332", content: "什么时候、在哪里，你可以做这个小小的尝试？" },
      { id: "q333", content: "如果遇到阻力，你愿意先对自己说什么？" },
      { id: "q334", content: "你愿意让谁知道你的这个小决定？" },
    ],
  },
  {
    id: "inner-child-relational",
    name: "内在小孩与关系",
    intro: "适合亲子、内在小孩、伴侣关系等专题，邀请对方与内在部分或关系中的角色对话。",
    questions: [
      { id: "q050", content: "你的内在小孩此刻需要什么？", spreadSlug: "child-inner-child" },
      { id: "q091", content: "那个小时候的你，最需要有人告诉他/她什么？" },
      { id: "q093", content: "如果你能回去陪伴那个小时候的你，你会做什么？" },
      { id: "q090", content: "给你的内在小孩写一句话，你会说什么？", spreadSlug: "child-inner-child" },
      { id: "q042", content: "你在这段关系中扮演什么角色？" },
      { id: "q051", content: "作为父母/孩子，你最想被理解的是什么？" },
      { id: "q335", content: "内在小孩此刻最想对你说什么？" },
      { id: "q336", content: "这段关系里，你在重复谁和谁的模式？" },
      { id: "q337", content: "你希望对方怎么对待你？你愿意怎么对待自己？" },
      { id: "q338", content: "如果关系可以有一个小小的改变，你希望是哪一点？" },
    ],
  },
  {
    id: "creativity-story",
    name: "创意与故事",
    intro: "用命名、故事、拟人等方式激发想象，适合创意工作坊或轻松破冰。",
    questions: [
      { id: "q140", content: "用这张卡开头的故事，会怎样发展？", spreadSlug: "solo-story" },
      { id: "q141", content: "如果这张卡是一部电影的海报，这部电影讲什么？" },
      { id: "q144", content: "如果你是画面里的某个元素，你会是什么？" },
      { id: "q033", content: "如果愤怒是一个人，他会说什么？" },
      { id: "q023", content: "这段哀伤如果有颜色，会是什么颜色？" },
      { id: "q339", content: "给这张卡配一句台词，会是什么？" },
      { id: "q340", content: "如果画面里的东西会说话，它们会在说什么？" },
      { id: "q341", content: "这张卡像哪首歌或哪部电影的某个瞬间？" },
      { id: "q342", content: "用三个词形容这张卡，你会选哪三个？" },
    ],
  },
];

/** 扁平列表，供搜索使用 */
export const QUESTIONS = QUESTION_SECTIONS.flatMap((s) =>
  s.questions.map((q) => ({ ...q, sectionId: s.id, sectionName: s.name }))
);

/** 总问题数 */
export const QUESTION_COUNT = QUESTIONS.length;

export function getQuestionsBySection(sectionId: string): GuidingQuestion[] {
  const section = QUESTION_SECTIONS.find((s) => s.id === sectionId);
  return section?.questions ?? [];
}

export function searchQuestions(keyword: string): typeof QUESTIONS {
  if (!keyword.trim()) return QUESTIONS;
  const kw = keyword.toLowerCase();
  return QUESTIONS.filter((q) => q.content.toLowerCase().includes(kw));
}
