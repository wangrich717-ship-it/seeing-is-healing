export interface SpreadPosition {
  index: number;
  meaning: string;
  /** 指定从哪个子套抽卡，留空则从全套混合池抽 */
  subDeckId?: string;
}

export interface Spread {
  id: string;
  slug: string;
  name: string;
  positionCount: number;
  positions: SpreadPosition[];
  recommendedQuestions: string[];
  deckSlugs: string[];
  introductionContent: string;
  category: string;
}

// ============ 经典核心 · 基础牌阵（多套系适用） ============

const singleCard: Spread = {
  id: "single-card",
  slug: "single-card",
  name: "单卡直觉牌阵",
  positionCount: 1,
  positions: [{ index: 0, meaning: "当下的镜子" }],
  recommendedQuestions: [
    "这张卡和现在的你有什么联系？",
    "第一眼看到这张卡，你的感受是什么？",
    "如果这张卡在说一句话，它会说什么？",
  ],
  deckSlugs: [
    "classic","saga","tale1001","mythos","chinamyth","tahiti","healheart",
    "cope","habitat","cuisine","morena","ecco","beauragard","orca",
    "tandoo","persona","child","resilio",
  ],
  introductionContent: `<p>单卡牌阵是最纯粹的 OH 卡入门方式。随机抽取一张，放下分析，让直觉与图像直接对话。适合日常自我检视、晨间意图设定，或在任何想停下来「看见自己」的时刻使用。</p>`,
  category: "经典核心",
};

const threeCard: Spread = {
  id: "three-card",
  slug: "three-card",
  name: "过去·现在·未来",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "过去（根源）" },
    { index: 1, meaning: "现在（现状）" },
    { index: 2, meaning: "未来（方向）" },
  ],
  recommendedQuestions: [
    "过去的经历如何塑造了今天的你？",
    "现在这张卡呼应了什么正在发生的事？",
    "第三张卡带给你什么样的可能性或启示？",
  ],
  deckSlugs: [
    "classic","saga","tale1001","mythos","healheart","cope","habitat",
    "tandoo","persona","child","resilio","morena",
  ],
  introductionContent: `<p>三张卡分别代表时间轴上的三个节点。过去一张呈现根源与模式，现在一张映照当下处境，未来一张指向可能性。三张合看，往往能看见一条被遗忘的生命叙事线。</p>`,
  category: "经典核心",
};

const relationship: Spread = {
  id: "relationship",
  slug: "relationship",
  name: "关系镜像牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我在关系中的状态" },
    { index: 1, meaning: "对方在关系中的状态" },
    { index: 2, meaning: "关系之间的空间" },
    { index: 3, meaning: "我想要的改变" },
  ],
  recommendedQuestions: [
    "这张卡如何描述你在这段关系中的感受？",
    "代表对方的那张卡，你看到了什么？",
    "第三张卡——关系之间的空间——让你想到什么？",
    "你最想在这段关系里改变的是什么？",
  ],
  deckSlugs: ["classic","tandoo","persona","child","healheart"],
  introductionContent: `<p>关系镜像牌阵帮助我们看见关系中「我」与「他者」的动态，以及两者之间尚未言说的空间。适合探索伴侣、亲子、友谊或职场关系。</p>`,
  category: "人物与关系",
};

// ============ 经典 OH 卡专属牌阵 ============

const shadowNourish: Spread = {
  id: "shadow-nourish",
  slug: "shadow-nourish",
  name: "阴影与滋养",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "阴暗面（不想看见的）" },
    { index: 1, meaning: "光明面（力量来源）" },
    { index: 2, meaning: "整合的礼物" },
  ],
  recommendedQuestions: [
    "这张「阴暗面」的卡，你最不愿意承认的是什么？",
    "光明面的卡给了你什么力量？",
    "整合这两面之后，你看见了什么礼物？",
  ],
  deckSlugs: ["classic","ecco","beauragard"],
  introductionContent: `<p>榮格式的阴影整合牌阵。第一张呈现我们压抑或回避的面向，第二张带出内在光源，第三张是整合之后浮现的礼物。特别适合与 OH 经典图卡或 ECCO 抽象卡搭配。</p>`,
  category: "经典核心",
};

const classicImageWord: Spread = {
  id: "classic-image-word",
  slug: "classic-image-word",
  name: "图字共鸣牌阵",
  positionCount: 2,
  positions: [
    { index: 0, meaning: "图卡（潜意识画面）", subDeckId: "img" },
    { index: 1, meaning: "字卡（意识层语言）", subDeckId: "word" },
  ],
  recommendedQuestions: [
    "图卡唤起了你什么样的情绪或记忆？",
    "字卡上的词语如何呼应或挑战了图卡的画面？",
    "图与字放在一起，你读到了什么故事？",
  ],
  deckSlugs: ["classic"],
  introductionContent: `<p>经典 OH 卡独有的图字组合玩法。同时抽一张图卡与一张字卡，让潜意识的画面与意识层的语言相遇，激发出超越单张卡的意义共振。</p>`,
  category: "经典核心",
};

// ============ 故事卡专属牌阵 ============

const soloStory: Spread = {
  id: "solo-story",
  slug: "solo-story",
  name: "独角故事牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "故事的起点" },
    { index: 1, meaning: "转折或挑战" },
    { index: 2, meaning: "故事的归宿" },
  ],
  recommendedQuestions: [
    "这张起点卡，你的主角是谁？发生了什么？",
    "遇到转折时，主角选择了什么？",
    "故事的结尾给你带来什么感受？",
  ],
  deckSlugs: ["saga","tale1001","mythos","chinamyth","tahiti"],
  introductionContent: `<p>用故事卡的图像构建一则属于你的叙事。三张卡分别对应故事三幕结构：起点设定情境，转折带出张力，归宿给出回应。适合在个人反思、小组分享或工作坊中使用。</p>`,
  category: "叙事与创意",
};

const storyChain: Spread = {
  id: "story-chain",
  slug: "story-chain",
  name: "接龙叙事牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "场景（在哪里）" },
    { index: 1, meaning: "人物（谁在那里）" },
    { index: 2, meaning: "事件（发生了什么）" },
    { index: 3, meaning: "转化（之后怎样了）" },
  ],
  recommendedQuestions: [
    "场景卡给你什么样的氛围感？",
    "人物卡里的角色让你联想到谁？",
    "事件卡——你觉得发生了什么最重要的事？",
    "转化卡如何呼应你现在想要的改变？",
  ],
  deckSlugs: ["saga","tale1001","mythos","chinamyth","tahiti","morena"],
  introductionContent: `<p>四张卡依次构建完整叙事元素：场景、人物、事件、转化。可以单人玩，也适合团体接龙——每人翻一张卡并接续故事，往往产生意想不到的集体智慧。</p>`,
  category: "叙事与创意",
};

// ============ 疗心卡专属牌阵 ============

const healheart3: Spread = {
  id: "healheart-three",
  slug: "healheart-three",
  name: "心的三角牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "心的伤痛" },
    { index: 1, meaning: "心的需要" },
    { index: 2, meaning: "心的疗愈路径" },
  ],
  recommendedQuestions: [
    "这张「伤痛」的卡，你愿意让自己感受一下吗？",
    "心最深处的需要是什么？",
    "疗愈路径那张卡，给你什么方向或行动？",
  ],
  deckSlugs: ["healheart"],
  introductionContent: `<p>疗心卡专属牌阵，聚焦于情感创伤与疗愈的三个层面。第一张呈现伤痛的核心，第二张触及未被满足的需要，第三张指向疗愈的下一步。温柔且有深度，适合一对一咨询情境。</p>`,
  category: "心灵疗愈",
};

// ============ ECCO/抽象卡专属牌阵 ============

const eccoHope: Spread = {
  id: "ecco-hope",
  slug: "ecco-hope",
  name: "希望之光牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "黑暗（当前困境）" },
    { index: 1, meaning: "微光（一丝希望）" },
    { index: 2, meaning: "光源（核心力量）" },
  ],
  recommendedQuestions: [
    "黑暗那张卡——你愿意承认的困境是什么？",
    "在这张微光卡里，你看到了什么可能性？",
    "光源卡代表你内在的什么力量？",
  ],
  deckSlugs: ["ecco","beauragard","healheart","cope"],
  introductionContent: `<p>从困境到希望的三步牌阵。ECCO 和博雷加德抽象卡的模糊特质，让这个牌阵特别能绕过理性防御，触及深层希望感。适合处于低谷期或需要重燃动力时使用。</p>`,
  category: "心灵疗愈",
};

// ============ 压力与复原力牌阵 ============

const stressResource: Spread = {
  id: "stress-resource",
  slug: "stress-resource",
  name: "压力与资源牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "压力源" },
    { index: 1, meaning: "身体感受" },
    { index: 2, meaning: "内在资源" },
    { index: 3, meaning: "下一步行动" },
  ],
  recommendedQuestions: [
    "压力源那张卡最让你有共鸣的是什么？",
    "身体感受卡——这股压力住在你身体的哪里？",
    "内在资源卡提醒你，你已经拥有什么力量？",
    "如果只能做一件事，下一步你会做什么？",
  ],
  deckSlugs: ["resilio","cope","healheart","classic"],
  introductionContent: `<p>压力管理专属牌阵，整合了身体感受与内在资源两个维度。前两张识别压力，后两张调动复原力，最终指向具体行动。特别适合与复原卡或应对卡搭配。</p>`,
  category: "心灵疗愈",
};

const resilioIdentify: Spread = {
  id: "resilio-identify",
  slug: "resilio-identify",
  name: "复原力识别牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "挑战（正在经历的）" },
    { index: 1, meaning: "复原力（已有的）" },
    { index: 2, meaning: "成长（可能获得的）" },
  ],
  recommendedQuestions: [
    "挑战卡呈现的画面，让你想到什么？",
    "复原力卡——你已经有哪些应对这个挑战的能力？",
    "成长卡代表你在这段历程中可以获得什么？",
  ],
  deckSlugs: ["resilio","classic","cope"],
  introductionContent: `<p>复原卡专属牌阵，帮助使用者在挑战中发现已有的复原资源，并展望成长的可能性。三张卡构成一个从「困境」到「能力」到「礼物」的正向叙事弧。</p>`,
  category: "心灵疗愈",
};

// ============ 应对卡专属牌阵 ============

const copeTrauma: Spread = {
  id: "cope-trauma",
  slug: "cope-trauma",
  name: "创伤见证牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "创伤发生了什么" },
    { index: 1, meaning: "我当时如何应对" },
    { index: 2, meaning: "这件事留下了什么" },
    { index: 3, meaning: "未来我想要什么" },
  ],
  recommendedQuestions: [
    "第一张卡，你愿意用这个画面说说发生了什么吗？（可以不说细节）",
    "当时的你，如何应对这一切？",
    "这件事在你内心留下了什么痕迹？",
    "现在你最想要的，是什么样的未来？",
  ],
  deckSlugs: ["cope","healheart","resilio"],
  introductionContent: `<p>应对卡专属创伤工作牌阵，遵循见证式叙事框架。四张卡帮助来访者以安全的方式触碰、命名与整合创伤经历，最后转向未来的希望。建议在专业咨询师引导下使用。</p>`,
  category: "心灵疗愈",
};

// ============ 人像卡专属牌阵 ============

const personaFamily: Spread = {
  id: "persona-family",
  slug: "persona-family",
  name: "家庭系统牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我在家庭中的位置" },
    { index: 1, meaning: "父亲的影响" },
    { index: 2, meaning: "母亲的影响" },
    { index: 3, meaning: "我想要的转化" },
  ],
  recommendedQuestions: [
    "第一张卡描述你在家庭中通常扮演的角色，你同意吗？",
    "父亲卡——这张卡呼应了你父亲对你的影响吗？",
    "母亲卡呈现的是什么？",
    "你最想从家庭模式中「解放」出来的是什么？",
  ],
  deckSlugs: ["persona","child","classic"],
  introductionContent: `<p>家庭系统排列的 OH 卡版本。用人像卡呈现家庭中的主要角色，探索原生家庭对当下自我的影响。特别适合与成年人像卡或孩童卡搭配，让具体的面孔与角色更有代入感。</p>`,
  category: "人物与关系",
};

const personaTime: Spread = {
  id: "persona-time",
  slug: "persona-time",
  name: "人生阶段牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "童年的我" },
    { index: 1, meaning: "现在的我" },
    { index: 2, meaning: "理想中的未来的我" },
  ],
  recommendedQuestions: [
    "童年那张卡，描述的是你哪个年龄段的自己？",
    "现在的你，和那个孩子有什么相似？有什么不同？",
    "未来那张卡，你希望那个人过着怎样的生活？",
  ],
  deckSlugs: ["persona","child","classic"],
  introductionContent: `<p>跨越时间轴的自我探索牌阵，适合人生转折期或年龄节点（如生日、毕业、退休）时使用。成年人像卡与孩童卡搭配使用效果尤佳，让「童年的我」与「现在的我」真正面对面。</p>`,
  category: "人物与关系",
};

// ============ 孩童卡专属牌阵 ============

const childInnerChild: Spread = {
  id: "child-inner-child",
  slug: "child-inner-child",
  name: "内在小孩牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "内在小孩的感受" },
    { index: 1, meaning: "小孩最需要的" },
    { index: 2, meaning: "成年自我能给予的" },
    { index: 3, meaning: "重新连结的礼物" },
  ],
  recommendedQuestions: [
    "这张卡呈现的内在小孩，正在经历什么？",
    "他/她最深的渴望是什么？",
    "作为现在的成年人，你可以给那个孩子什么？",
    "当你们重新连结，你感受到什么？",
  ],
  deckSlugs: ["child","persona","classic","healheart"],
  introductionContent: `<p>内在小孩工作专属牌阵，适合探索童年创伤、自我养育与成人自我和内在小孩的对话。孩童卡的真实面孔让这个议题更有温度与具体感。</p>`,
  category: "心灵疗愈",
};

// ============ 土著卡专属牌阵 ============

const morenaGoal: Spread = {
  id: "morena-goal",
  slug: "morena-goal",
  name: "目标与行动牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我的目标/梦想" },
    { index: 1, meaning: "阻碍我的是什么" },
    { index: 2, meaning: "我已有的资源" },
    { index: 3, meaning: "下一步行动" },
  ],
  recommendedQuestions: [
    "目标卡里，你看见的那个愿景是什么？",
    "阻碍卡代表什么阻力或恐惧？",
    "资源卡提醒你，你已经拥有什么？",
    "如果明天只做一件事，你会做什么？",
  ],
  deckSlugs: ["morena","resilio","classic"],
  introductionContent: `<p>土著卡温暖的自然画面适合与目标和行动主题配合，帮助使用者在温柔的氛围中梳理梦想、识别阻力，并调动已有资源迈出下一步。</p>`,
  category: "自然与生活",
};

// ============ 经典 OH 卡专属牌阵（续）============

const classicFiveDimensions: Spread = {
  id: "classic-five-dimensions",
  slug: "classic-five-dimensions",
  name: "五向内在探索",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "身体——我现在的身体感受" },
    { index: 1, meaning: "情绪——我现在的情绪状态" },
    { index: 2, meaning: "思维——我最常有的念头" },
    { index: 3, meaning: "关系——我在关系中的模式" },
    { index: 4, meaning: "渴望——我内心深处真正想要的" },
  ],
  recommendedQuestions: [
    "身体那张卡——你的身体此刻在说什么？",
    "情绪卡呈现的颜色或画面，让你联想到什么感受？",
    "思维卡：这个画面是否映照出你最熟悉的内心声音？",
    "关系卡里的场景，像不像你在某段关系里的状态？",
    "渴望那张卡：如果它是你最深的答案，它在说什么？",
    "五张卡放在一起，你看到了什么整体画面？",
  ],
  deckSlugs: ["classic"],
  introductionContent: `<p>五张图卡分别映照人的五个内在维度：身体、情绪、思维、关系与渴望。这是一个全景式自我快照——不需要分析，只需要停下来看一看。建议每张卡都先静默观看 30 秒，再用一句话描述感受。五张看完后，再退后一步看整体，往往会有意外的领悟。</p>
<p>适合：每月一次深度自我检视；人生阶段转折时；感到迷失或分裂感时。</p>`,
  category: "经典核心",
};

const classicTimeFlow: Spread = {
  id: "classic-time-flow",
  slug: "classic-time-flow",
  name: "时间轴·图字双层",
  positionCount: 6,
  positions: [
    { index: 0, meaning: "过去·图卡（发生了什么）", subDeckId: "img" },
    { index: 1, meaning: "过去·字卡（那时的核心词）", subDeckId: "word" },
    { index: 2, meaning: "现在·图卡（当下的处境）", subDeckId: "img" },
    { index: 3, meaning: "现在·字卡（此刻的核心词）", subDeckId: "word" },
    { index: 4, meaning: "未来·图卡（可能的方向）", subDeckId: "img" },
    { index: 5, meaning: "未来·字卡（你想带走的词）", subDeckId: "word" },
  ],
  recommendedQuestions: [
    "过去的图卡唤起了什么记忆或感受？配上那个字，有什么新的意思？",
    "现在的图+字组合，描述你当下处境最准确的是哪一面？",
    "未来的图卡：这个画面是你「想要」的，还是「担心」出现的？",
    "未来的字卡：这个词是你愿意带入未来的力量，还是需要放下的重担？",
    "把三组图字连成一个故事，这个故事的主题是什么？",
  ],
  deckSlugs: ["classic"],
  introductionContent: `<p>经典 OH 卡独特的图字双层结构，在时间轴牌阵里产生六重对话：每个时间节点都同时有「画面」（图卡）与「语言」（字卡）的回应。图卡碰触潜意识直觉，字卡锚定意识层意义，两层叠加往往揭示出单张卡看不见的隐藏叙事。</p>
<p>使用建议：先把三组图字各自放好，分开看完再整体连读，不要急着解释。</p>`,
  category: "经典核心",
};

const classicCrossroads: Spread = {
  id: "classic-crossroads",
  slug: "classic-crossroads",
  name: "人生交叉口",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "当前处境（我站在哪里）" },
    { index: 1, meaning: "选择 A 的画面" },
    { index: 2, meaning: "选择 B 的画面" },
    { index: 3, meaning: "内心真正的渴望" },
    { index: 4, meaning: "内在智慧的指引" },
  ],
  recommendedQuestions: [
    "当前处境那张卡：这个画面准确描述了你现在的状态吗？",
    "选择 A 的卡给你什么感觉？是扩展还是收缩？",
    "选择 B 的卡呢？你的身体对它有什么反应？",
    "渴望那张卡：撇开「应该」，你真正想要的是什么？",
    "智慧卡：如果这张卡是你最深处的声音，它在说什么？",
    "把五张卡摆成 X 形，两条路通向的，是同一个渴望吗？",
  ],
  deckSlugs: ["classic"],
  introductionContent: `<p>当面临两条路而无法抉择时，这个牌阵帮助你绕过「利弊分析」，直接触碰内心深处的真实渴望。前两张是两个选项的直觉画面，第四张是内心真正的声音，第五张是整合性的智慧。</p>
<p>特别提示：抽选择 A 和 B 的卡之前，先在心里明确「哪个是 A，哪个是 B」，然后直觉抽取，不要犹豫。</p>`,
  category: "经典核心",
};

const classicInnerDialogue: Spread = {
  id: "classic-inner-dialogue",
  slug: "classic-inner-dialogue",
  name: "内在对话·双声道",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "内在批评者（那个苛刻的声音）" },
    { index: 1, meaning: "内在批评者说的字（核心指责）" },
    { index: 2, meaning: "内在养育者（慈悲的声音）" },
    { index: 3, meaning: "内在养育者说的字（真实需要）" },
  ],
  recommendedQuestions: [
    "批评者那张图：这个画面让你想到什么场景或什么人？",
    "批评者的字卡：这个词是你内心对自己最常说的话吗？",
    "养育者那张图：这个画面带给你什么感受？",
    "养育者的字卡：如果这是你最需要听到的话，你现在感受如何？",
    "两组卡放在一起，你的内在两个声音之间，真正的对话是什么？",
  ],
  deckSlugs: ["classic"],
  introductionContent: `<p>每个人内心都有两种声音：一个批评苛责，一个温柔养育。这个牌阵让两种声音各自发言——先是批评者（图+字），再是养育者（图+字）。</p>
<p>在许多心理工作坊中，这个牌阵常让人惊讶地发现：批评者的图卡往往是某段旧记忆，而养育者的字卡，往往是你一直想对自己说却从未说出口的那句话。</p>`,
  category: "经典核心",
};

const classicRelationshipMap: Spread = {
  id: "classic-relationship-map",
  slug: "classic-relationship-map",
  name: "关系地图·六角星",
  positionCount: 6,
  positions: [
    { index: 0, meaning: "我在这段关系里的真实状态" },
    { index: 1, meaning: "我在关系里未说出口的感受" },
    { index: 2, meaning: "对方的状态（以我的眼光感知）" },
    { index: 3, meaning: "关系的共同空间" },
    { index: 4, meaning: "关系里最大的阻力" },
    { index: 5, meaning: "如果这段关系可以疗愈，它的样子" },
  ],
  recommendedQuestions: [
    "第一张卡（我的真实状态）：你愿意承认这个画面代表了什么吗？",
    "第二张（未说出口的感受）：这个词或画面，是你一直没说出来的吗？",
    "第三张（感知对方）：你认为对方现在是什么状态？这张卡准确吗？",
    "第四张（共同空间）：这个共同的空间是什么颜色、什么温度？",
    "第五张（阻力）：这张卡代表的阻力，你们都知道它在吗？",
    "第六张（疗愈后的样子）：你愿意让这段关系走向这张卡的方向吗？",
  ],
  deckSlugs: ["classic"],
  introductionContent: `<p>六张卡构成一个完整的关系地图：两个人的状态（含表面与隐藏层）、共同空间、阻力，以及疗愈的方向。适合探索任何重要关系——伴侣、亲子、友谊、职场。</p>
<p>进阶玩法：邀请关系中的另一方一起用这个牌阵，各自抽完后对话，往往会产生深刻的相互理解。</p>`,
  category: "经典核心",
};

const classicWholeness: Spread = {
  id: "classic-wholeness",
  slug: "classic-wholeness",
  name: "圆满·七重探索",
  positionCount: 7,
  positions: [
    { index: 0, meaning: "我现在是谁（核心自我）" },
    { index: 1, meaning: "我的光（明显的力量）" },
    { index: 2, meaning: "我的影（回避的面向）" },
    { index: 3, meaning: "我与他人的连结" },
    { index: 4, meaning: "我与身体的连结" },
    { index: 5, meaning: "我的梦想与渴望" },
    { index: 6, meaning: "整合后，我的下一步" },
  ],
  recommendedQuestions: [
    "核心自我那张卡，此刻你认同它吗？",
    "光的那张卡：这是你已经知道的力量，还是你常忘记的力量？",
    "影的那张卡：你愿意在这里停留一会儿吗？",
    "连结那张卡：你的关系网络，现在是什么状态？",
    "身体那张卡：你的身体此刻想对你说什么？",
    "梦想那张卡：这个画面让你感到兴奋还是恐惧？",
    "下一步那张卡：如果这是一个行动的邀请，你愿意接受吗？",
  ],
  deckSlugs: ["classic"],
  introductionContent: `<p>七张卡覆盖人的完整存在维度：核心身份、光与影的两极、与他人的连结、与身体的连结、梦想，以及整合后的行动方向。这是所有 OH 卡牌阵中最完整的单人探索格式。</p>
<p>建议用法：在重要的生命节点（生日、年末、重大转变前后）使用。七张卡全部翻开后，先沉默看 2-3 分钟，再逐张回应。整个过程建议留出 60-90 分钟。</p>`,
  category: "经典核心",
};

// ============ 叙事与创意专属牌阵 ============

// —— SAGA 英雄之旅故事卡 ——
const sagaHeroJourney: Spread = {
  id: "saga-hero-journey",
  slug: "saga-hero-journey",
  name: "英雄旅程五幕",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "启程——我从哪里出发" },
    { index: 1, meaning: "考验——我遇到了什么" },
    { index: 2, meaning: "深渊——最黑暗的时刻" },
    { index: 3, meaning: "转化——我发生了什么改变" },
    { index: 4, meaning: "归来——我带回了什么" },
  ],
  recommendedQuestions: [
    "启程那张卡：你的英雄是谁？他/她为什么出发？",
    "考验卡：这个画面里的挑战，现实中像什么？",
    "深渊卡：你在这张卡里感受到了什么？愿意多停留一会儿吗？",
    "转化卡：是什么让英雄发生了改变？",
    "归来卡：英雄带回了什么礼物或智慧？这和你自己的生命有什么呼应？",
  ],
  deckSlugs: ["saga"],
  introductionContent: `<p>坎贝尔「英雄旅程」的 OH 卡版本。SAGA 故事卡的图像天然适合这个结构——每张卡都像一个神话场景的定格。五张卡连起来，讲述一个完整的蜕变故事，而这个故事往往是你自己生命历程的隐喻。</p><p>建议抽完五张后，用 3-5 分钟用语言或写作把故事串联起来，不必追求「正确答案」，跟随直觉即可。</p>`,
  category: "叙事与创意",
};

const sagaInnerVillain: Spread = {
  id: "saga-inner-villain",
  slug: "saga-inner-villain",
  name: "英雄与阴影",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "内在英雄（我认同的力量）" },
    { index: 1, meaning: "内在反派（我抗拒的部分）" },
    { index: 2, meaning: "整合——如果英雄与反派和解" },
  ],
  recommendedQuestions: [
    "英雄卡：这个形象代表你最认同的力量是什么？",
    "反派卡：这个画面让你感到不舒服吗？它代表你内心哪个你不愿承认的部分？",
    "整合卡：如果这两种力量合二为一，会产生什么？",
    "SAGA 卡里的反派往往守护着某个深层的真相——你看见了什么？",
  ],
  deckSlugs: ["saga"],
  introductionContent: `<p>荣格阴影理论遇见英雄叙事。SAGA 卡里的反派角色提供了一个安全容器，让我们得以看见自己回避的内在面向。英雄与反派本是一体两面——整合这两者，往往能释放出意想不到的能量。</p>`,
  category: "叙事与创意",
};

const sagaGift: Spread = {
  id: "saga-gift",
  slug: "saga-gift",
  name: "天赋使命牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我的天赋（我带来了什么）" },
    { index: 1, meaning: "我的阻碍（什么挡在路上）" },
    { index: 2, meaning: "我的盟友（谁在支持我）" },
    { index: 3, meaning: "我的使命（我为什么在这里）" },
  ],
  recommendedQuestions: [
    "天赋卡：这个画面里藏着什么样的礼物或才能？",
    "阻碍卡：这个阻碍是外在的，还是内在的恐惧？",
    "盟友卡：你的盟友是人、是品质，还是某种力量？",
    "使命卡：这张卡如果是你人生问题的答案，它在说什么？",
  ],
  deckSlugs: ["saga"],
  introductionContent: `<p>英雄之旅最核心的议题：发现自己的天赋，看见阻碍，找到盟友，接受使命。SAGA 卡的角色图像让这四个维度更具体，更容易触发真实的内在共鸣。</p>`,
  category: "叙事与创意",
};

// —— 1001故事卡 ——
const tale1001Wish: Spread = {
  id: "tale1001-wish",
  slug: "tale1001-wish",
  name: "三个愿望",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我最深的愿望" },
    { index: 1, meaning: "愿望背后的代价" },
    { index: 2, meaning: "我真正需要的" },
  ],
  recommendedQuestions: [
    "愿望卡：如果神灯精灵问你「你的愿望是什么」，这张卡在说什么？",
    "代价卡：每个愿望都有代价，这张卡揭示了什么？",
    "真正需要卡：去掉所有的「应该」，你内心最深处真正渴望的是什么？",
    "三张卡放在一起，愿望、代价、真实需要，你看见了什么模式？",
  ],
  deckSlugs: ["tale1001"],
  introductionContent: `<p>《一千零一夜》里，愿望总是充满魔法与陷阱。这个三张卡牌阵探索欲望的三个层次：表层愿望、隐藏代价，以及比愿望更深的真实需要。适合在做决定前，或感到「得到了却还是不满足」时使用。</p>`,
  category: "叙事与创意",
};

const tale1001Labyrinth: Spread = {
  id: "tale1001-labyrinth",
  slug: "tale1001-labyrinth",
  name: "迷宫之心",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我在迷宫里（当前困境）" },
    { index: 1, meaning: "迷宫的墙（让我动弹不得的）" },
    { index: 2, meaning: "内心的线索（我已拥有的指引）" },
    { index: 3, meaning: "出口的方向" },
  ],
  recommendedQuestions: [
    "迷宫卡：这个处境让你感到什么？压迫、迷失、还是某种熟悉？",
    "墙壁卡：这堵墙是外在条件，还是内在信念？",
    "线索卡：像忒修斯的阿里阿德涅线团，你手里握着什么？",
    "出口卡：这张卡给了你什么方向感？",
  ],
  deckSlugs: ["tale1001"],
  introductionContent: `<p>迷宫是《一千零一夜》和神话故事里永恒的意象。这个牌阵用四张卡描绘困境（迷宫）、阻力（墙）、资源（线索）与方向（出口），帮助我们在迷失时找到属于自己的路径。</p>`,
  category: "叙事与创意",
};

const tale1001Narrator: Spread = {
  id: "tale1001-narrator",
  slug: "tale1001-narrator",
  name: "今夜的故事",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "故事的开场（曾经……）" },
    { index: 1, meaning: "最关键的转折" },
    { index: 2, meaning: "故事献给谁" },
  ],
  recommendedQuestions: [
    "开场卡：用「很久很久以前……」开头，这个画面怎么接续？",
    "转折卡：故事里发生了什么意想不到的事？",
    "最后一张：这个故事是说给谁听的？它想传达什么？",
    "如果山鲁佐德说这个故事是为了「留住生命」，你的故事在守护什么？",
  ],
  deckSlugs: ["tale1001"],
  introductionContent: `<p>《一千零一夜》的核心是「讲故事救自己」——山鲁佐德用故事换取了生命。这个牌阵邀请你做今晚的讲述者：三张卡构成一则简短而完整的故事，而故事的接收者往往是你内心最需要被触碰的那部分。</p>`,
  category: "叙事与创意",
};

// —— 西方神话卡 ——
const mythosArchetype: Spread = {
  id: "mythos-archetype",
  slug: "mythos-archetype",
  name: "我的神话原型",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "英雄原型（我认同的力量）" },
    { index: 1, meaning: "阴影原型（我回避的）" },
    { index: 2, meaning: "导师原型（我内在的智慧）" },
    { index: 3, meaning: "整合的宝藏" },
  ],
  recommendedQuestions: [
    "英雄卡：这个神话形象代表你什么样的力量？",
    "阴影卡：这个原型让你感到不适吗？它守护着什么真相？",
    "导师卡：你内在的哪个声音是智慧的来源？",
    "宝藏卡：整合三种原型之后，你获得了什么？",
  ],
  deckSlugs: ["mythos"],
  introductionContent: `<p>荣格指出，我们每个人心里都住着多种神话原型：英雄、阴影、导师、孩子……MYTHOS 卡的画面不直接指向任何神话，让你的直觉自由地与图像对话，发现自己独特的内在神话结构。</p>`,
  category: "叙事与创意",
};

const mythosFate: Spread = {
  id: "mythos-fate",
  slug: "mythos-fate",
  name: "命运叙事",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "被命运安排的（我无法选择的）" },
    { index: 1, meaning: "我能主动选择的" },
    { index: 2, meaning: "我的神话故事主题" },
  ],
  recommendedQuestions: [
    "第一张：什么是你「命中注定」无法改变的？你接受它了吗？",
    "第二张：在那些限制之内，你拥有什么自由？",
    "第三张：如果你的人生是一个神话故事，它的核心主题是什么？",
  ],
  deckSlugs: ["mythos"],
  introductionContent: `<p>古希腊神话里，命运（Moira）与自由意志始终拉锯。这个牌阵帮助我们厘清：什么是我们无法选择的底色，什么是我们可以主动书写的部分，以及这两者共同构成了怎样的生命叙事。</p>`,
  category: "叙事与创意",
};

const mythosMonster: Spread = {
  id: "mythos-monster",
  slug: "mythos-monster",
  name: "与怪兽和解",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我的内在怪兽（我最怕的）" },
    { index: 1, meaning: "怪兽守护着什么" },
    { index: 2, meaning: "如何与怪兽和解" },
  ],
  recommendedQuestions: [
    "怪兽卡：这个画面让你想到什么恐惧或黑暗面？",
    "守护卡：神话里的怪兽往往守护着宝藏——你的怪兽在守护什么？",
    "和解卡：不是打败怪兽，而是与它共存——这张卡给了什么方式？",
  ],
  deckSlugs: ["mythos"],
  introductionContent: `<p>神话里的怪兽（弥诺陶洛斯、美杜莎、九头蛇）都是英雄必须面对的内在试炼。MYTHOS 卡模糊的画面特别适合投射那些「说不清楚」的恐惧——让怪兽有个形状，是和解的第一步。</p>`,
  category: "叙事与创意",
};

// —— 中国神话卡 ——
const chinamythFiveElements: Spread = {
  id: "chinamyth-five-elements",
  slug: "chinamyth-five-elements",
  name: "五行探索",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "木——生长与向上的力量" },
    { index: 1, meaning: "火——热情与转化的力量" },
    { index: 2, meaning: "土——稳定与滋养的力量" },
    { index: 3, meaning: "金——收敛与界限的力量" },
    { index: 4, meaning: "水——流动与智慧的力量" },
  ],
  recommendedQuestions: [
    "木那张卡：你的生长动力来自哪里？",
    "火那张卡：什么让你充满热情？什么让你感到燃烧？",
    "土那张卡：什么给了你稳定感和归属感？",
    "金那张卡：你在哪些事情上需要更清晰的界限？",
    "水那张卡：你的流动性和智慧藏在哪里？",
    "五张看完，哪个元素对你最强？哪个最弱？这说明了什么？",
  ],
  deckSlugs: ["chinamyth"],
  introductionContent: `<p>五行是中国传统哲学对宇宙能量的分类，也是对人内在动力的隐喻。中国神话卡的图像充满传统意象，让五行探索不再抽象——五张卡分别映照你内在的五种能量，看哪种最活跃，哪种最需要滋养。</p>`,
  category: "叙事与创意",
};

const chinamythTransformation: Spread = {
  id: "chinamyth-transformation",
  slug: "chinamyth-transformation",
  name: "变形记",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "原形（我曾经是谁）" },
    { index: 1, meaning: "历练（什么改变了我）" },
    { index: 2, meaning: "新形（我正在成为谁）" },
    { index: 3, meaning: "变形的意义" },
  ],
  recommendedQuestions: [
    "原形卡：那个「旧的我」是什么样子？",
    "历练卡：是什么力量或事件推动了这场变形？",
    "新形卡：新的形态是你「想要的」，还是「被迫」的？",
    "意义卡：这场变形，最终告诉了你什么？",
  ],
  deckSlugs: ["chinamyth"],
  introductionContent: `<p>中国神话里充满变形意象——女娲造人、精卫填海、嫦娥奔月……变形往往是成长与蜕变的隐喻。这个牌阵帮助我们讲述自己的「变形故事」：我曾经是谁，什么改变了我，我正在成为什么。</p>`,
  category: "叙事与创意",
};

const chinamythAncestors: Spread = {
  id: "chinamyth-ancestors",
  slug: "chinamyth-ancestors",
  name: "先祖智慧",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "先祖留下的（我从家族继承了什么）" },
    { index: 1, meaning: "我选择传承的" },
    { index: 2, meaning: "我想留给未来的" },
  ],
  recommendedQuestions: [
    "第一张：家族传下来的力量、信念或模式，这张卡呼应了什么？",
    "第二张：在所有继承的东西中，你选择带走哪些？",
    "第三张：如果你可以给下一代留下什么，你希望是什么？",
  ],
  deckSlugs: ["chinamyth"],
  introductionContent: `<p>中国文化中，先祖智慧是重要的精神资源。这个牌阵探索家族传承的三个层面：过去留下了什么、我主动选择传承什么，以及我想向未来延伸什么。适合在清明、年末或家庭议题涌现时使用。</p>`,
  category: "叙事与创意",
};

// —— 大溪地画家卡 ——
const tahitiParadise: Spread = {
  id: "tahiti-paradise",
  slug: "tahiti-paradise",
  name: "内在伊甸园",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我内心的伊甸园（最理想的状态）" },
    { index: 1, meaning: "我失落了什么" },
    { index: 2, meaning: "如何找回" },
  ],
  recommendedQuestions: [
    "伊甸园卡：这张卡里的画面，代表你什么样的理想状态？",
    "失落卡：是什么让你离开了那个状态？",
    "找回卡：这张卡给了你什么方向？",
    "高更离开文明去大溪地寻找「本原」——你的本原是什么？",
  ],
  deckSlugs: ["tahiti"],
  introductionContent: `<p>高更离开巴黎，去大溪地寻找「未被文明污染的本原之美」。这个牌阵借用这个主题，探索：在你内心，那个「本来的自己」是什么样的，什么让你失落了它，以及如何找回那种状态。</p>`,
  category: "叙事与创意",
};

const tahitiColorSoul: Spread = {
  id: "tahiti-color-soul",
  slug: "tahiti-color-soul",
  name: "色彩灵魂",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "现在的我是什么色彩" },
    { index: 1, meaning: "我渴望的色彩" },
    { index: 2, meaning: "我内在的阴暗色" },
    { index: 3, meaning: "我内在的光亮色" },
  ],
  recommendedQuestions: [
    "现在的色彩卡：这张图的主色调是什么？符合你现在的状态吗？",
    "渴望的色彩卡：这个色彩带给你什么感受？",
    "阴暗色卡：哪个颜色让你感到紧缩或不舒服？它代表什么？",
    "光亮色卡：这个色彩在你生命里什么时候最亮？",
  ],
  deckSlugs: ["tahiti"],
  introductionContent: `<p>高更对色彩的运用极具表现力——大溪地画作里的橙、红、绿、蓝都是他内在情感的外化。这个牌阵借用「色彩作为情绪语言」，帮助你感知当下状态，以及内在光与影的两极。</p>`,
  category: "叙事与创意",
};

const tahitiPrimitive: Spread = {
  id: "tahiti-primitive",
  slug: "tahiti-primitive",
  name: "本原回归",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "被文明压抑的（我放弃了什么）" },
    { index: 1, meaning: "我内在的野性与本能" },
    { index: 2, meaning: "与自然本性重连" },
  ],
  recommendedQuestions: [
    "压抑卡：你在「社会化」的过程中，放弃了什么真实的自己？",
    "野性卡：这张卡里有什么让你感到「是的，这才是我」？",
    "重连卡：如何才能更贴近你的本原状态？",
  ],
  deckSlugs: ["tahiti"],
  introductionContent: `<p>大溪地系列卡片带着高更对「文明与本原」的永恒追问。这个牌阵探索你内心被社会化压抑的那部分——那些真实的情感、欲望和本能——以及如何安全地与它们重连。</p>`,
  category: "叙事与创意",
};

// ============ 心灵疗愈专属牌阵 ============

// —— 疗心卡（补充2个）——
const healheartnurture: Spread = {
  id: "healheart-nurture",
  slug: "healheart-nurture",
  name: "滋养礼物",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "当下需要被滋养的部分" },
    { index: 1, meaning: "滋养的方式（来自内在）" },
    { index: 2, meaning: "滋养后，我能给予自己的礼物" },
  ],
  recommendedQuestions: [
    "第一张卡：此刻的你，哪个部分最需要被温柔对待？",
    "第二张卡：这张卡提示你，滋养可以从哪里来？",
    "第三张卡：当你被好好滋养之后，你能给自己什么？",
  ],
  deckSlugs: ["healheart"],
  introductionContent: `<p>疗心卡分为「滋养组」与「阴影组」，这个牌阵专注于滋养的维度——看见需要，找到来源，感受礼物。适合在疲惫、情绪低落或渴望自我关爱时使用。</p>`,
  category: "心灵疗愈",
};

const healhearBodyWisdom: Spread = {
  id: "healheart-body",
  slug: "healheart-body",
  name: "身体智慧",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "身体现在的感受" },
    { index: 1, meaning: "情绪的颜色与形状" },
    { index: 2, meaning: "身体最需要的" },
    { index: 3, meaning: "身体想告诉我的智慧" },
  ],
  recommendedQuestions: [
    "身体感受卡：这张卡里的画面住在你身体的哪个位置？",
    "情绪卡：这个颜色或形状，你的情绪现在长什么样？",
    "需要卡：你的身体在轻声请求什么？",
    "智慧卡：如果你的身体是最古老的向导，它今天想对你说什么？",
  ],
  deckSlugs: ["healheart"],
  introductionContent: `<p>疗心卡由辅导专业工作者设计，本就关注情绪与身体的连结。这个牌阵邀请你把注意力带回身体——用四张卡探索此刻身体的感受、情绪的形状、深层需要，以及身体智慧的声音。</p>`,
  category: "心灵疗愈",
};

// —— COPE 克服卡 ——
const copeCopingStyles: Spread = {
  id: "cope-coping-styles",
  slug: "cope-coping-styles",
  name: "应对风格探索",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我惯用的应对方式" },
    { index: 1, meaning: "这种方式的代价" },
    { index: 2, meaning: "一种新的可能性" },
    { index: 3, meaning: "我的核心力量" },
  ],
  recommendedQuestions: [
    "惯用应对卡：这张图像呼应了你遇到压力时最自动化的反应吗？",
    "代价卡：这种应对方式让你付出了什么？",
    "新可能卡：这张卡提示了什么不同的应对路径？",
    "核心力量卡：无论如何应对，你最稳固的内在力量是什么？",
  ],
  deckSlugs: ["cope"],
  introductionContent: `<p>COPE 卡涵盖重大创伤到日常困境的四个层面。这个牌阵聚焦于「如何应对」本身——帮助我们看见惯用模式的效果与代价，并开放探索新的应对方式。</p>`,
  category: "心灵疗愈",
};

const copeDaily: Spread = {
  id: "cope-daily",
  slug: "cope-daily",
  name: "日常逆境三步",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "当下困境（发生了什么）" },
    { index: 1, meaning: "我的内在资源" },
    { index: 2, meaning: "下一步行动" },
  ],
  recommendedQuestions: [
    "困境卡：这个画面准确描述了你现在的处境吗？",
    "资源卡：你已经拥有哪些可以调用的力量或支持？",
    "行动卡：如果明天只做一件事，这张卡在建议什么？",
  ],
  deckSlugs: ["cope"],
  introductionContent: `<p>简洁有力的三步框架，适合日常小逆境（不是大创伤）的快速自我支持。COPE 卡写实的图像让困境有了具体的面孔，资源和行动也因此更清晰。</p>`,
  category: "心灵疗愈",
};

const copeTransformation: Spread = {
  id: "cope-transformation",
  slug: "cope-transformation",
  name: "困境炼金术",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "困境的原貌" },
    { index: 1, meaning: "困境激发的情绪" },
    { index: 2, meaning: "困境里隐藏的意义" },
    { index: 3, meaning: "转化后的礼物" },
  ],
  recommendedQuestions: [
    "原貌卡：这张卡描述的困境，你愿意用一句话命名它吗？",
    "情绪卡：这些情绪住在你身体哪里？",
    "意义卡：如果这件事是来「教你什么」，它在教什么？",
    "礼物卡：困境炼化之后，你得到了什么？",
  ],
  deckSlugs: ["cope"],
  introductionContent: `<p>炼金术的比喻：铅被转化为金。困境也可以是成长的原料。这个牌阵不急着「解决问题」，而是先让情绪被看见，再找到意义，最后感受礼物——这是 COPE 卡最深层的使用方式。</p>`,
  category: "心灵疗愈",
};

// —— ECCO 抽象卡 ——
const eccoAbstractMirror: Spread = {
  id: "ecco-abstract-mirror",
  slug: "ecco-abstract-mirror",
  name: "抽象镜子",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我现在内在的形状" },
    { index: 1, meaning: "我想成为的形状" },
    { index: 2, meaning: "从这里到那里" },
  ],
  recommendedQuestions: [
    "第一张卡：这个抽象图形让你联想到什么状态、情绪或处境？",
    "第二张卡：这个形状代表你渴望的状态——它有什么感觉？",
    "第三张卡：如果这是转化的过程，你看见了什么路径？",
  ],
  deckSlugs: ["ecco"],
  introductionContent: `<p>ECCO 卡的完全抽象性是它的超能力——没有具体形象，意义全由你赋予。这个牌阵利用抽象图形作为「内在状态的形状」，让无法用语言描述的感受得以被看见和表达。</p>`,
  category: "心灵疗愈",
};

const eccoFormless: Spread = {
  id: "ecco-formless",
  slug: "ecco-formless",
  name: "无形之境",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "恐惧的形状" },
    { index: 1, meaning: "欲望的形状" },
    { index: 2, meaning: "边界的形状" },
    { index: 3, meaning: "自由的形状" },
  ],
  recommendedQuestions: [
    "恐惧卡：这个抽象图形如何描述你内心的恐惧感？",
    "欲望卡：这个形状里藏着什么你渴望的东西？",
    "边界卡：这张卡让你感受到什么样的轮廓或界限？",
    "自由卡：什么是你的自由的形状？这张卡准确吗？",
  ],
  deckSlugs: ["ecco"],
  introductionContent: `<p>四个内在体验的抽象映照。ECCO 卡特别适合创伤后的探索——因为它不要求「说清楚发生了什么」，只需要「感受这个形状像什么」。四张卡给了恐惧、欲望、边界与自由各自一个视觉形状。</p>`,
  category: "心灵疗愈",
};

const eccoColorField: Spread = {
  id: "ecco-color-field",
  slug: "ecco-color-field",
  name: "色彩情绪场",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "此刻情绪的颜色" },
    { index: 1, meaning: "我渴望的情绪颜色" },
    { index: 2, meaning: "转化的颜色" },
  ],
  recommendedQuestions: [
    "此刻颜色卡：这个颜色或图形，符合你现在情绪的温度和质地吗？",
    "渴望颜色卡：这张卡代表你希望自己处于的状态，它是什么感觉？",
    "转化颜色卡：从此刻到渴望，需要什么样的转变？",
  ],
  deckSlugs: ["ecco"],
  introductionContent: `<p>颜色是情绪最直接的语言。ECCO 卡的抽象色块让我们绕过理性叙述，直接用视觉感知情绪的温度。三张卡构成一个从「现在」到「渴望」再到「转化」的色彩旅程。</p>`,
  category: "心灵疗愈",
};

// —— 博雷加德卡 ——
const beauragardBlur: Spread = {
  id: "beauragard-blur",
  slug: "beauragard-blur",
  name: "模糊边界探索",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "清晰的（我确定的）" },
    { index: 1, meaning: "模糊的（我说不清的）" },
    { index: 2, meaning: "两者之间的智慧" },
  ],
  recommendedQuestions: [
    "清晰卡：在这个议题上，你最确定的是什么？",
    "模糊卡：这张图描述了你无法言说的部分吗？不需要解释——只需要感受。",
    "智慧卡：在清晰与模糊之间，有什么是两者都告诉你的？",
  ],
  deckSlugs: ["beauragard"],
  introductionContent: `<p>博雷加德卡的「似与不似」特质，让它特别适合探索那些「说不清楚」的内在状态。这个牌阵主动利用这种模糊性——让清晰的和不清晰的并排而立，往往能在之间找到意想不到的洞见。</p>`,
  category: "心灵疗愈",
};

const beauragardSubconscious: Spread = {
  id: "beauragard-subconscious",
  slug: "beauragard-subconscious",
  name: "潜意识显影",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "表层意识说的" },
    { index: 1, meaning: "潜意识真正感受的" },
    { index: 2, meaning: "两者的冲突" },
    { index: 3, meaning: "整合后的清晰" },
  ],
  recommendedQuestions: [
    "表层卡：这张图代表你「官方版本」的想法或感受——你通常告诉别人什么？",
    "潜意识卡：这张图代表那个你私下里真正感受的——你不常说出口的是什么？",
    "冲突卡：两者之间的张力是什么？",
    "整合卡：当两个声音都被听见，什么变得更清晰了？",
  ],
  deckSlugs: ["beauragard"],
  introductionContent: `<p>博雷加德卡的模糊画面能够绕过理性防御，直接触碰潜意识层。这个牌阵设计了「表层vs潜意识」的双声道结构，帮助我们看见自己对某个议题的真实感受——往往和我们对外宣称的不同。</p>`,
  category: "心灵疗愈",
};

const beauragardArtTherapy: Spread = {
  id: "beauragard-art-therapy",
  slug: "beauragard-art-therapy",
  name: "艺术疗愈三幕",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "困扰（画面里的黑暗）" },
    { index: 1, meaning: "觉察（我看见了什么）" },
    { index: 2, meaning: "转化（新的意义）" },
  ],
  recommendedQuestions: [
    "困扰卡：这张模糊的图里，你的困扰藏在哪里？",
    "觉察卡：当你静静看这张卡，你看见了什么之前没注意到的？",
    "转化卡：同样的画面，有没有可能用不同的眼光来看？",
  ],
  deckSlugs: ["beauragard"],
  introductionContent: `<p>艺术治疗的核心是「再框架」——同样的图像，从不同角度看，意义完全不同。博雷加德卡的抽象性天然支持这种再框架。三幕结构：先让困扰被看见，再深化觉察，最后在同一张图里找到新的意义。</p>`,
  category: "心灵疗愈",
};

// —— 复原卡 ——
const resilioMap: Spread = {
  id: "resilio-map",
  slug: "resilio-map",
  name: "复原力地图",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "我经历的挑战" },
    { index: 1, meaning: "内在资源（我已有的）" },
    { index: 2, meaning: "外在支持（周围有谁）" },
    { index: 3, meaning: "过去我是如何度过难关的" },
    { index: 4, meaning: "这次我可以如何运用这些" },
  ],
  recommendedQuestions: [
    "挑战卡：这张卡如何描述你现在的处境？",
    "内在资源卡：你内心有什么力量是你已经拥有的？",
    "外在支持卡：谁或什么在你身边支持你？",
    "过去策略卡：你以前是怎么度过类似困难的？",
    "整合卡：把所有资源放在一起，这次你打算怎么做？",
  ],
  deckSlugs: ["resilio"],
  introductionContent: `<p>复原卡专为复原力构建设计。这个五张卡地图从挑战出发，系统盘点内在资源、外在支持与过去成功经验，最终整合成行动方向。特别适合在危机后的重建阶段使用。</p>`,
  category: "心灵疗愈",
};

const resilioAnimalPower: Spread = {
  id: "resilio-animal-power",
  slug: "resilio-animal-power",
  name: "力量动物",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我的力量动物（内在的野性智慧）" },
    { index: 1, meaning: "它带给我的礼物" },
    { index: 2, meaning: "如何在生活中运用这股力量" },
  ],
  recommendedQuestions: [
    "力量动物卡：这张动物卡让你联想到什么品质或力量？",
    "礼物卡：这种品质可以带给你什么？",
    "运用卡：在你当前的生活里，这股力量可以用在哪里？",
  ],
  deckSlugs: ["resilio"],
  introductionContent: `<p>复原卡独特的「力量动物」子套（44张）为这个牌阵提供了绝佳素材。许多原住民传统相信每个人都有守护动物——这个牌阵帮助你识别自己内在的动物智慧，并将它带入日常生活。</p>`,
  category: "心灵疗愈",
};

const resilioComeback: Spread = {
  id: "resilio-comeback",
  slug: "resilio-comeback",
  name: "逆境反弹",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "跌倒的地方（发生了什么）" },
    { index: 1, meaning: "我学到的（这次不一样的是）" },
    { index: 2, meaning: "我站起来用的力量" },
    { index: 3, meaning: "站起来之后的样子" },
  ],
  recommendedQuestions: [
    "跌倒卡：这个画面准确描述了那次挫折吗？",
    "学习卡：从那次经历中，你学到了什么是之前不知道的？",
    "力量卡：你是靠什么站起来的？",
    "之后的样子卡：站起来的你，和跌倒之前有什么不同？",
  ],
  deckSlugs: ["resilio"],
  introductionContent: `<p>「逆境反弹」不是假装没有跌倒，而是诚实地经历跌倒，然后找到站起来的力量。复原卡的图像充满生命力，特别适合讲述这个从挫折到成长的完整故事。</p>`,
  category: "心灵疗愈",
};

// ============ 自然与生活专属牌阵 ============

// —— 土著卡 ——
const morenaRoots: Spread = {
  id: "morena-roots",
  slug: "morena-roots",
  name: "部落智慧",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我的根（我来自哪里）" },
    { index: 1, meaning: "先人留下的智慧" },
    { index: 2, meaning: "大地给予我的" },
    { index: 3, meaning: "我选择传承的" },
  ],
  recommendedQuestions: [
    "根卡：这个画面如何呈现你的「来处」？",
    "先人智慧卡：家族或文化传承给你的最珍贵的东西是什么？",
    "大地卡：自然给了你什么滋养？",
    "传承卡：在所有继承的中，你选择带走什么，又要放下什么？",
  ],
  deckSlugs: ["morena"],
  introductionContent: `<p>土著卡来自巴西雨林部落，温和而充满大地能量。这个牌阵探索归属感与传承——我们从哪里来，携带着什么，以及选择传递什么到未来。特别适合与家族议题或文化认同相关的探索。</p>`,
  category: "自然与生活",
};

const morenaNatureBody: Spread = {
  id: "morena-nature-body",
  slug: "morena-nature-body",
  name: "自然与身体",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我的身体像什么自然景象" },
    { index: 1, meaning: "身体现在最需要什么" },
    { index: 2, meaning: "与自然重连的方式" },
  ],
  recommendedQuestions: [
    "自然景象卡：如果你的身体状态是一个自然场景，它是什么？（干旱的土地？流动的溪水？）",
    "需要卡：你的身体在悄悄请求什么？",
    "重连卡：这张卡提示你，如何让自己回到自然的节律？",
  ],
  deckSlugs: ["morena"],
  introductionContent: `<p>土著文化相信人与自然是一体的——人的身体本是自然的一部分。MORENA 的温和画面帮助我们用「自然语言」来理解身体状态，找到与自然节律重新同步的路径。</p>`,
  category: "自然与生活",
};

const morenaCommunity: Spread = {
  id: "morena-community",
  slug: "morena-community",
  name: "社群归属",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我在社群中的角色" },
    { index: 1, meaning: "我的贡献" },
    { index: 2, meaning: "我的需要" },
    { index: 3, meaning: "我想要的归属感" },
  ],
  recommendedQuestions: [
    "角色卡：在你重要的群体（家庭、工作、社区）里，你通常扮演什么角色？",
    "贡献卡：你给这个群体带来了什么？",
    "需要卡：你在群体中需要被满足的是什么？",
    "归属卡：你理想中的归属感是什么感觉？",
  ],
  deckSlugs: ["morena"],
  introductionContent: `<p>MORENA 卡描绘的是部落生活——集体劳作、庆典、家庭……这些场景自然地引发关于「我在群体中是谁」的思考。四张卡探索你在社群中的角色、贡献、需要和理想的归属感。</p>`,
  category: "自然与生活",
};

// —— 家园卡 ——
const habitatRoots: Spread = {
  id: "habitat-roots",
  slug: "habitat-roots",
  name: "根与土",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我的根（扎根的地方）" },
    { index: 1, meaning: "滋养我的土壤" },
    { index: 2, meaning: "阻碍生长的" },
    { index: 3, meaning: "我向往的阳光" },
  ],
  recommendedQuestions: [
    "根卡：什么给了你最深的归属感和稳定感？",
    "土壤卡：什么在滋养你、支持你的成长？",
    "阻碍卡：是什么在阻止你完全开花结果？",
    "阳光卡：你的生命渴望朝向什么生长？",
  ],
  deckSlugs: ["habitat"],
  introductionContent: `<p>家园卡描绘地球各种自然环境，用植物生长的隐喻来探索人的生命状态：根代表归属与稳定，土壤代表滋养，阻碍代表限制，阳光代表渴望与方向。适合探索「我在哪里生长，我向哪里生长」。</p>`,
  category: "自然与生活",
};

const habitatEcosystem: Spread = {
  id: "habitat-ecosystem",
  slug: "habitat-ecosystem",
  name: "内在生态系统",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我在整体中的位置" },
    { index: 1, meaning: "我依赖什么" },
    { index: 2, meaning: "我给予什么" },
  ],
  recommendedQuestions: [
    "位置卡：在你的生命生态系统里，你扮演什么角色？（是树、是水、是阳光？）",
    "依赖卡：你最需要哪些外部支持才能运转？",
    "给予卡：你在这个系统里提供了什么？",
    "三张卡放在一起，你的「内在生态」是平衡的吗？",
  ],
  deckSlugs: ["habitat"],
  introductionContent: `<p>生态系统里，每种生物都在接受与给予，在依存与贡献中维持平衡。家园卡的自然图像让我们得以用这个隐喻审视自己在关系和社会中的角色——我在哪里，我需要什么，我提供什么。</p>`,
  category: "自然与生活",
};

const habitatClimate: Spread = {
  id: "habitat-climate",
  slug: "habitat-climate",
  name: "内在气候",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "当下的内在天气" },
    { index: 1, meaning: "我理想的内在天气" },
    { index: 2, meaning: "影响我内在气候的" },
    { index: 3, meaning: "一阵改变的风" },
  ],
  recommendedQuestions: [
    "当下天气卡：如果你现在的心情是一种天气，是暴风雨、薄雾还是晴天？",
    "理想天气卡：你希望自己处于什么样的内在气候？",
    "影响卡：是什么持续影响着你的内在天气系统？",
    "改变之风卡：什么样的微小改变，能够开始转变你的内在气候？",
  ],
  deckSlugs: ["habitat"],
  introductionContent: `<p>「内在气候」是比「情绪」更宏观的概念——它是你内在世界长期的氛围和基调。家园卡呈现各种天气与生态环境，让我们得以用气候的眼光理解自己：当下的天气如何，理想的天气是什么，以及如何造成改变。</p>`,
  category: "自然与生活",
};

// —— 食物卡 ——
const cuisineHunger: Spread = {
  id: "cuisine-hunger",
  slug: "cuisine-hunger",
  name: "饥渴地图",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "身体的饥渴" },
    { index: 1, meaning: "情感的饥渴" },
    { index: 2, meaning: "灵魂的饥渴" },
  ],
  recommendedQuestions: [
    "身体饥渴卡：你的身体此刻渴望什么？（不只是食物——是休息、触碰、运动？）",
    "情感饥渴卡：你的心此刻最渴望得到什么？（爱、认可、被看见？）",
    "灵魂饥渴卡：在更深的层次，你的灵魂在寻找什么？",
    "三种饥渴放在一起，你看见了什么模式？",
  ],
  deckSlugs: ["cuisine"],
  introductionContent: `<p>食物卡的食物图像是探索「饥渴」最直觉的媒介——我们对食物的渴望，往往映照着更深层次的需要。三张卡分别对应身体、情感与灵魂三个层面的饥渴，帮助我们厘清「我到底在饥渴什么」。</p>`,
  category: "自然与生活",
};

const cuisineRecipe: Spread = {
  id: "cuisine-recipe",
  slug: "cuisine-recipe",
  name: "人生食谱",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "主要原材料（我是由什么构成的）" },
    { index: 1, meaning: "调味料（让我有味道的）" },
    { index: 2, meaning: "火候（成长需要的温度）" },
    { index: 3, meaning: "成品（我在成为什么）" },
    { index: 4, meaning: "分享给谁" },
  ],
  recommendedQuestions: [
    "原材料卡：组成你的「原料」是什么？（经历、价值观、性格？）",
    "调味料卡：是什么让你独特、有味道？",
    "火候卡：你的成长需要什么样的温度和环境？",
    "成品卡：你正在成为什么样的人？",
    "分享卡：这个「你」，最终想给谁、给什么？",
  ],
  deckSlugs: ["cuisine"],
  introductionContent: `<p>把人生想象成一道料理：我们由不同的「原料」构成，经过「调味」和「火候」的塑造，最终成为一道独特的料理，然后分享出去。食物卡的丰富图像让这个隐喻充满具体的感官质地。</p>`,
  category: "自然与生活",
};

const cuisineComfort: Spread = {
  id: "cuisine-comfort",
  slug: "cuisine-comfort",
  name: "安慰食物",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我的安慰食物（给我安全感的）" },
    { index: 1, meaning: "它满足了什么" },
    { index: 2, meaning: "它背后真正的渴望" },
  ],
  recommendedQuestions: [
    "安慰卡：这张卡里的食物（或场景）让你感到什么样的安全感？",
    "满足卡：这种安慰满足了你的什么需要？",
    "渴望卡：在安慰食物背后，你真正在寻找的是什么？",
  ],
  deckSlugs: ["cuisine"],
  introductionContent: `<p>安慰食物（comfort food）往往承载着记忆、安全感和情感需要。食物卡特别适合这个主题——从一张具体的食物图像出发，一路深入，找到那个比食物更深的真实渴望。</p>`,
  category: "自然与生活",
};

// —— 逆戟鲸卡 ——
const orcaDepth: Spread = {
  id: "orca-depth",
  slug: "orca-depth",
  name: "深海探索",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "水面——我展示给世界的" },
    { index: 1, meaning: "水中——我私下感受的" },
    { index: 2, meaning: "深海——我很少触碰的" },
  ],
  recommendedQuestions: [
    "水面卡：这张卡描述的是你「对外版本」的状态吗？",
    "水中卡：在水面之下，你私下的感受是什么？",
    "深海卡：这张卡代表你很少触碰的内在深处，你愿意看看吗？",
  ],
  deckSlugs: ["orca"],
  introductionContent: `<p>鲸鱼生活在深海里——这个意象是探索意识层次的完美隐喻。三个深度：水面（展示的）、水中（私下的）、深海（鲜少触碰的）。逆戟鲸卡真实的鲸群照片，给这种「深入」的探索带来了力量感。</p>`,
  category: "自然与生活",
};

const orcaMigration: Spread = {
  id: "orca-migration",
  slug: "orca-migration",
  name: "迁徙之旅",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我出发的地方" },
    { index: 1, meaning: "旅途中的同伴" },
    { index: 2, meaning: "我前往的目的地" },
    { index: 3, meaning: "旅途中最珍贵的" },
  ],
  recommendedQuestions: [
    "出发地卡：你从哪里开始这段生命旅程的？",
    "同伴卡：谁或什么在你的旅途中与你同行？",
    "目的地卡：你在朝向哪里前进？那里是什么样的？",
    "珍贵卡：这段迁徙中，什么是最重要的礼物？",
  ],
  deckSlugs: ["orca"],
  introductionContent: `<p>逆戟鲸每年长途迁徙，是自然界中令人震撼的生命旅程。这个牌阵用迁徙的隐喻探索你的生命旅程：你从哪里来，谁与你同行，你前往哪里，以及这段旅途最珍贵的是什么。</p>`,
  category: "自然与生活",
};

const orcaPod: Spread = {
  id: "orca-pod",
  slug: "orca-pod",
  name: "族群归属",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我在群体中的样子" },
    { index: 1, meaning: "我的独特性" },
    { index: 2, meaning: "我对群体的贡献" },
    { index: 3, meaning: "我在群体中的需要" },
  ],
  recommendedQuestions: [
    "群体中的样子卡：在你重要的群体里，你通常是什么状态？",
    "独特性卡：你与群体里其他人最不同的地方是什么？",
    "贡献卡：你给这个「鲸群」带来了什么？",
    "需要卡：你希望群体能给你什么？你真的开口要了吗？",
  ],
  deckSlugs: ["orca"],
  introductionContent: `<p>逆戟鲸以高度社群性著称，它们有终身的家族连结、复杂的沟通系统和深厚的情感。这个牌阵用鲸群（pod）的意象探索你在群体中的位置、独特性、贡献与需要。</p>`,
  category: "自然与生活",
};

// ============ 人物与关系专属牌阵 ============

// —— 伴侣卡 ——
const tandooCoupleMirror: Spread = {
  id: "tandoo-couple-mirror",
  slug: "tandoo-couple-mirror",
  name: "伴侣镜像",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我眼中的我（在这段关系里）" },
    { index: 1, meaning: "我眼中的你（我对伴侣的感知）" },
    { index: 2, meaning: "我想象你眼中的我" },
    { index: 3, meaning: "我们共同的空间" },
  ],
  recommendedQuestions: [
    "我眼中的我卡：在这段伴侣关系里，你是什么样子的？",
    "我眼中的你卡：你如何感知你的伴侣？这张卡准确吗？",
    "对方眼中的我卡：你认为伴侣是怎么看你的？",
    "共同空间卡：你们之间共享的那个「我们」空间，是什么样的？",
  ],
  deckSlugs: ["tandoo"],
  introductionContent: `<p>伴侣卡专为深入探索伴侣关系设计。四个视角构成一面多棱镜：我如何看自己、如何看对方、我以为对方如何看我，以及「我们」共同的空间。进阶玩法：邀请伴侣各自抽完再对话，发现彼此感知的差异，往往是关系深化的契机。</p>`,
  category: "人物与关系",
};

const tandooLoveLanguage: Spread = {
  id: "tandoo-love-language",
  slug: "tandoo-love-language",
  name: "爱的语言",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我表达爱的方式" },
    { index: 1, meaning: "我接收爱的方式" },
    { index: 2, meaning: "我渴望得到的爱" },
    { index: 3, meaning: "我愿意给予的爱" },
  ],
  recommendedQuestions: [
    "表达爱卡：你通常怎么让对方感受到你的爱？",
    "接收爱卡：你最容易感受到爱的方式是什么？",
    "渴望卡：你最渴望从关系里得到什么样的爱？",
    "给予卡：你最自然、最愿意给出的爱是什么？",
    "四张卡放在一起，你和伴侣的「爱的语言」匹配吗？",
  ],
  deckSlugs: ["tandoo"],
  introductionContent: `<p>盖瑞·查普曼的「五种爱的语言」理论认为，很多关系问题来自双方表达和接收爱的方式不同。伴侣卡的生活场景图像让这个探索更具体——四张卡分别映照你的爱的语言的四个面向。</p>`,
  category: "人物与关系",
};

const tandooConflict: Spread = {
  id: "tandoo-conflict",
  slug: "tandoo-conflict",
  name: "关系修复",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "我的立场与感受" },
    { index: 1, meaning: "我感知到的对方立场" },
    { index: 2, meaning: "冲突的核心（是什么在争）" },
    { index: 3, meaning: "我内心真正的需要" },
    { index: 4, meaning: "修复的第一步" },
  ],
  recommendedQuestions: [
    "我的立场卡：在这次冲突里，你的核心感受是什么？",
    "对方立场卡：你感知到对方最在意的是什么？",
    "冲突核心卡：冲突表面是关于什么，深处真正在争的是什么？",
    "我的需要卡：在这次冲突背后，你最深的需要是什么？",
    "修复卡：如果今天只做一件事来修复，那会是什么？",
  ],
  deckSlugs: ["tandoo"],
  introductionContent: `<p>伴侣冲突往往有两层：表层争的是「事」，深层争的是「被看见和被爱」。这个五张卡牌阵帮助我们分开两层，先看清双方的立场和需要，再找到修复的第一步。适合冲突后的独立反思，也适合在伴侣咨询中共同使用。</p>`,
  category: "人物与关系",
};

// —— 成年人像卡 ——
const personaPortrait: Spread = {
  id: "persona-portrait",
  slug: "persona-portrait",
  name: "自画像",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "外在形象（我给世界看的）" },
    { index: 1, meaning: "内在感受（我私下感受的）" },
    { index: 2, meaning: "隐藏面（我不常展示的）" },
    { index: 3, meaning: "理想自我（我想成为的）" },
    { index: 4, meaning: "整合（所有面向组成的完整的我）" },
  ],
  recommendedQuestions: [
    "外在形象卡：这个人物的样子，描述了你「对外展示的自己」吗？",
    "内在感受卡：这个人物的状态，更像你私下真实的感受吗？",
    "隐藏面卡：这张卡里有什么让你「不想让人看见」的？",
    "理想卡：你希望自己成为什么样的人？",
    "整合卡：把所有这些放在一起，你看见了一个怎样完整的自己？",
  ],
  deckSlugs: ["persona"],
  introductionContent: `<p>成年人像卡的真实人物面孔让「自我探索」更加直接和有温度。五张卡构成一幅多维自画像：外在展示、内在感受、隐藏面、理想自我，以及整合后的完整画像。</p>`,
  category: "人物与关系",
};

const personaRole: Spread = {
  id: "persona-role",
  slug: "persona-role",
  name: "角色解放",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我惯常扮演的角色" },
    { index: 1, meaning: "这个角色的代价" },
    { index: 2, meaning: "角色背后真实的我" },
    { index: 3, meaning: "解放后，我想成为" },
  ],
  recommendedQuestions: [
    "角色卡：这个人物让你想到自己在某段关系里的角色吗？（如：照顾者、表演者、调解人）",
    "代价卡：长期扮演这个角色，你付出了什么？",
    "真实的我卡：去掉所有角色，那个最真实的你是什么样的？",
    "解放卡：如果你被允许做更真实的自己，那会是什么样的人？",
  ],
  deckSlugs: ["persona"],
  introductionContent: `<p>我们每个人都在不同关系里扮演着不同角色——这些角色有其价值，也有其代价。成年人像卡的具体人物形象让我们更容易辨识自己的角色模式。这个牌阵邀请我们检视角色、看见代价，并探索更真实的自我。</p>`,
  category: "人物与关系",
};

const personaEncounter: Spread = {
  id: "persona-encounter",
  slug: "persona-encounter",
  name: "人际相遇",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我带给他人的" },
    { index: 1, meaning: "他人带给我的" },
    { index: 2, meaning: "我渴望的相遇方式" },
    { index: 3, meaning: "我需要的界限" },
  ],
  recommendedQuestions: [
    "我带给他人卡：在人际关系里，你通常给出什么？（能量、智慧、陪伴？）",
    "他人带给我卡：你在关系里最珍视接收到的是什么？",
    "渴望的相遇卡：你理想中的人际连结是什么感觉？",
    "界限卡：在人际关系里，你需要守护什么？",
  ],
  deckSlugs: ["persona"],
  introductionContent: `<p>成年人像卡的多元面孔是探索人际议题的绝佳媒介。这个牌阵从「相遇」的角度切入——我给出什么，我接收什么，我渴望什么样的连结，以及我需要什么样的界限。</p>`,
  category: "人物与关系",
};

// —— 孩童卡 ——
const childPlay: Spread = {
  id: "child-play",
  slug: "child-play",
  name: "游戏精神",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我的内在孩子（此刻的样子）" },
    { index: 1, meaning: "他/她最想做的游戏" },
    { index: 2, meaning: "成年的我能给他/她的空间" },
  ],
  recommendedQuestions: [
    "内在孩子卡：这个孩子的样子，让你想到自己什么年龄段的自己？",
    "游戏卡：你的内在孩子最渴望的游戏或自由是什么？",
    "空间卡：在你现在的生活里，可以为那个孩子创造什么样的空间？",
  ],
  deckSlugs: ["child"],
  introductionContent: `<p>游戏是儿童的母语——但我们长大后，往往忘记了怎么玩。孩童卡的真实孩子面孔和场景，让我们能够更直接地感知内在孩子的状态和渴望，并探索如何在成年生活里为那种游戏精神保留空间。</p>`,
  category: "人物与关系",
};

const childSchool: Spread = {
  id: "child-school",
  slug: "child-school",
  name: "学习与恐惧",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "学习中的恐惧（怕什么）" },
    { index: 1, meaning: "失败的面孔（失败对我意味着）" },
    { index: 2, meaning: "勇气的来源" },
    { index: 3, meaning: "我想对那个害怕的孩子说的话" },
  ],
  recommendedQuestions: [
    "恐惧卡：在学习或成长中，你最深的恐惧是什么？",
    "失败卡：这张卡呈现的「失败感」，你熟悉吗？它从哪里来？",
    "勇气卡：什么让你在害怕中仍然愿意尝试？",
    "最后一张：如果你可以对那个害怕的孩子说一句话，你说什么？",
  ],
  deckSlugs: ["child"],
  introductionContent: `<p>很多成年人对学习和失败的恐惧，根源在儿时的经历。孩童卡的真实孩子形象让这些记忆更容易被触碰。这个牌阵帮助我们回到那个「怕犯错的孩子」身边，给他/她一些成年后才能给予的支持。</p>`,
  category: "人物与关系",
};

const childGrowing: Spread = {
  id: "child-growing",
  slug: "child-growing",
  name: "成长轴线",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "童年的我（0-12岁）" },
    { index: 1, meaning: "少年的我（13-18岁）" },
    { index: 2, meaning: "青年的我（18-25岁）" },
    { index: 3, meaning: "现在的我（当下）" },
  ],
  recommendedQuestions: [
    "童年卡：这个孩子让你想到什么年龄和什么样的自己？",
    "少年卡：那个年纪的你，最大的困惑或渴望是什么？",
    "青年卡：那时的你，在追求什么或逃避什么？",
    "现在卡：现在的你，和这三个「以前的你」有什么相同？有什么不同？",
    "四张卡连成一条线，你的成长故事的主题是什么？",
  ],
  deckSlugs: ["child"],
  introductionContent: `<p>成长轴线牌阵邀请你从不同年龄段的角度回望自己的成长历程。孩童卡的真实儿童形象让每个时期的「过去的你」有了具体的面孔，更容易触发真实的记忆与情感。四张卡连起来，往往能看见一个完整的自我成长叙事。</p>`,
  category: "人物与关系",
};

// ============ 双子套专属牌阵 ============

// —— 伴侣卡：伴侣图 × 路标 ——
const tandooSignCouple: Spread = {
  id: "tandoo-sign-couple",
  slug: "tandoo-sign-couple",
  name: "伴侣·路标共鸣",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我们关系的当下画面", subDeckId: "couple" },
    { index: 1, meaning: "关系里的路标（方向指引）", subDeckId: "sign" },
    { index: 2, meaning: "我们共同的渴望", subDeckId: "couple" },
    { index: 3, meaning: "前行的路标（下一步）", subDeckId: "sign" },
  ],
  recommendedQuestions: [
    "当下画面卡：这张伴侣图描述了你们现在的关系状态吗？",
    "路标卡（方向）：这个路标符号指向什么方向？在你们的关系里意味着什么？",
    "共同渴望卡：这张卡里，你们共同想要的是什么？",
    "下一步路标卡：这个方向指示，是你们关系的下一步行动邀请吗？",
  ],
  deckSlugs: ["tandoo"],
  introductionContent: `<p>伴侣卡独特的「99张生活场景图 + 44张路标互动卡」结构，天然支持「画面」与「方向」的双层对话。这个牌阵让图像卡呈现关系的「是什么」，路标卡指向「去哪里」——两套卡轮流发言，构成一次完整的关系对话。</p>`,
  category: "人物与关系",
};

// —— 成年人像卡：人像 × 互动 ——
const personaPortraitInteract: Spread = {
  id: "persona-portrait-interact",
  slug: "persona-portrait-interact",
  name: "人像·互动双镜",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "我是谁（人像）", subDeckId: "portrait" },
    { index: 1, meaning: "我在关系中如何互动", subDeckId: "interact" },
    { index: 2, meaning: "我渴望成为的样子（人像）", subDeckId: "portrait" },
    { index: 3, meaning: "我渴望的互动方式", subDeckId: "interact" },
  ],
  recommendedQuestions: [
    "第一张人像卡：这个人的神情或姿态，像现在的你吗？",
    "互动卡（当下）：这张卡描述了你现在和他人互动的方式吗？",
    "第三张人像卡：你希望成为的那个人，是什么样的？",
    "互动卡（渴望）：你理想中，和重要他人的相处方式是什么？",
    "现在的你和理想中的你，差距在哪里？需要什么才能缩短这个距离？",
  ],
  deckSlugs: ["persona"],
  introductionContent: `<p>成年人像卡由「77张人像卡 + 33张互动卡」组成。人像卡呈现「我是谁」，互动卡呈现「我如何与人相处」——两套卡分别映照自我认同与关系模式。这个牌阵让两套卡成对出现，探索「现在的我」与「理想中的我」的两个维度。</p>`,
  category: "人物与关系",
};

// —— 孩童卡：肖像 × 行动 ——
const childPortraitAction: Spread = {
  id: "child-portrait-action",
  slug: "child-portrait-action",
  name: "孩子·行动对话",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "内在孩子的样子（肖像）", subDeckId: "portrait" },
    { index: 1, meaning: "他/她的行动或情境", subDeckId: "action" },
    { index: 2, meaning: "被爱护的孩子（肖像）", subDeckId: "portrait" },
    { index: 3, meaning: "我能为他/她做的行动", subDeckId: "action" },
  ],
  recommendedQuestions: [
    "第一张肖像卡：这个孩子让你想到哪个年龄段的自己？",
    "行动卡（情境）：这个情境或动作，发生在那个孩子身上意味着什么？",
    "第三张肖像卡：被好好照顾的那个孩子，他/她的样子是这样吗？",
    "行动卡（我能做的）：作为成年的自己，你可以为内在孩子做哪个行动？",
  ],
  deckSlugs: ["child"],
  introductionContent: `<p>孩童卡的「77张肖像卡 + 44张行动/情况卡」，让内在小孩工作有了更丰富的维度。肖像卡呈现「孩子的样子」，行动卡呈现「孩子所处的处境和行动」。四张卡两两成对，构建一个从「受伤的孩子」到「被爱护的孩子」的完整疗愈弧线。</p>`,
  category: "心灵疗愈",
};

// —— 土著卡：图像 × 追踪 ——
const morenaImgTrack: Spread = {
  id: "morena-img-track",
  slug: "morena-img-track",
  name: "图像·追踪双探索",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "当下处境的画面", subDeckId: "img" },
    { index: 1, meaning: "追踪：我在追寻什么", subDeckId: "track" },
    { index: 2, meaning: "内心景象（图像）", subDeckId: "img" },
    { index: 3, meaning: "追踪：我的下一个足迹", subDeckId: "track" },
  ],
  recommendedQuestions: [
    "当下画面卡：这张巴西雨林图像描述了你现在的处境或感受吗？",
    "追踪卡（追寻）：这个足迹符号指向你在生命中追寻的是什么？",
    "内心景象卡：这张图像呼应了你内心的什么风景？",
    "追踪卡（下一步）：你的下一个脚印，要落在哪里？",
  ],
  deckSlugs: ["morena"],
  introductionContent: `<p>土著卡由「88张部落生活图像 + 22张足迹追踪卡」构成。图像卡呈现「现在的风景」，追踪卡呈现「方向与足迹」。这个牌阵让两套卡交替出现，创造一次从「我在哪里」到「我去哪里」的视觉旅程。</p>`,
  category: "自然与生活",
};

// —— 复原卡：情境 × 动物 ——
const resilioMainAnimal: Spread = {
  id: "resilio-main-animal",
  slug: "resilio-main-animal",
  name: "情境·力量动物共鸣",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "当前挑战的情境", subDeckId: "main" },
    { index: 1, meaning: "守护我的力量动物", subDeckId: "animal" },
    { index: 2, meaning: "复原后的情境", subDeckId: "main" },
    { index: 3, meaning: "引领我前进的力量动物", subDeckId: "animal" },
  ],
  recommendedQuestions: [
    "挑战情境卡：这个画面如何描述你现在面对的压力或挑战？",
    "力量动物卡（守护）：这只动物有什么特质？它如何守护你渡过难关？",
    "复原情境卡：复原后，你希望生活呈现什么样的画面？",
    "力量动物卡（引领）：这只动物的哪种力量，能引领你走向那个画面？",
  ],
  deckSlugs: ["resilio"],
  introductionContent: `<p>复原卡独特的「99张情境主卡 + 44张力量动物卡」结构，让这个牌阵产生独特的「处境与力量」双重对话：情境卡呈现现实的挑战与目标，动物卡带来内在的野性智慧与力量。两套卡交替出现，构建一个从困境到复原的完整路径。</p>`,
  category: "心灵疗愈",
};

// ============ 专题疗愈专属牌阵 ============

const familyTree: Spread = {
  id: "family-tree",
  slug: "family-tree",
  name: "家族树牌阵",
  positionCount: 4,
  positions: [
    { index: 0, meaning: "父亲（或父系代表）" },
    { index: 1, meaning: "母亲（或母系代表）" },
    { index: 2, meaning: "自己" },
    { index: 3, meaning: "家族传承的礼物 / 需要放下的包袱" },
  ],
  recommendedQuestions: [
    "父亲卡：这张卡如何呈现父亲对你的影响？",
    "母亲卡：母亲卡呈现的是什么？",
    "自己卡：在家族脉络中，你看见自己处于什么位置？",
    "传承卡：这是家族给你的礼物，还是需要放下的包袱？你最想从家庭模式中「解放」出来的是什么？",
  ],
  deckSlugs: ["persona", "child", "tandoo", "classic"],
  introductionContent: `<p>家族树牌阵帮助探索原生家庭模式对当下的影响，打破代际循环，实现自我和解。分别抽取代表父亲、母亲、自己的卡牌，再抽一张卡代表「家族传承的礼物」或「需要放下的包袱」，直观看见代际传承与和解方向。</p>`,
  category: "人物与关系",
};

const maskSpread: Spread = {
  id: "mask-spread",
  slug: "mask-spread",
  name: "面具牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "别人眼中的我（社会面具）" },
    { index: 1, meaning: "真实的我（内在自我）" },
    { index: 2, meaning: "理想的我（成长方向）" },
  ],
  recommendedQuestions: [
    "面具卡：这张「别人眼中的我」准确吗？你为了适应外界付出了什么？",
    "真实卡：去掉所有面具，那个最真实的你是什么样的？",
    "理想卡：你希望成为什么样的人？从真实到理想，需要跨越什么？",
  ],
  deckSlugs: ["ecco", "mythos", "resilio", "classic"],
  introductionContent: `<p>面具牌阵帮助解决「我是谁」的迷茫，整合内在矛盾，建立稳定的自我价值感。三张牌分别呈现社会面具、内在自我与理想方向，看见三者之间的张力与整合可能。</p>`,
  category: "心灵疗愈",
};

const lifeRiver: Spread = {
  id: "life-river",
  slug: "life-river",
  name: "生命之河牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "过去（生命的上游）" },
    { index: 1, meaning: "现在（当下的河段）" },
    { index: 2, meaning: "未来（生命流向）" },
  ],
  recommendedQuestions: [
    "过去卡：生命的上游带给你什么？有哪些未完成的故事？",
    "现在卡：当下的河段，你感受到什么样的水流与阻力？",
    "未来卡：生命之河将流向哪里？你渴望的方向是什么？",
  ],
  deckSlugs: ["tale1001", "habitat", "ecco", "orca"],
  introductionContent: `<p>生命之河牌阵超越日常琐碎，连接更高维度的生命意义，解决存在性焦虑。通过古老的故事隐喻与自然意象，探索生命流动的方向和意义。</p>`,
  category: "自然与生活",
};

const energyField: Spread = {
  id: "energy-field",
  slug: "energy-field",
  name: "能量场牌阵",
  positionCount: 5,
  positions: [
    { index: 0, meaning: "中心：我" },
    { index: 1, meaning: "关系/环境 1" },
    { index: 2, meaning: "关系/环境 2" },
    { index: 3, meaning: "关系/环境 3" },
    { index: 4, meaning: "关系/环境 4" },
  ],
  recommendedQuestions: [
    "中心卡：此刻的你，能量状态如何？",
    "关系卡：这些关系或环境离你太近（边界被侵犯）还是太远（需要连接）？",
    "整体：你的能量场中，哪些关系在滋养你？哪些在消耗你？",
  ],
  deckSlugs: ["tandoo", "cope", "habitat", "healheart"],
  introductionContent: `<p>能量场牌阵帮助识别能量损耗源，建立健康的心理边界。中心放一张代表自己的卡，四周抽取卡牌代表不同的人际关系或环境，直观看到哪些关系离自己太近（边界被侵犯），哪些太远（需要连接）。</p>`,
  category: "心灵疗愈",
};

const moneyAwareness: Spread = {
  id: "money-awareness",
  slug: "money-awareness",
  name: "金钱觉察牌阵",
  positionCount: 3,
  positions: [
    { index: 0, meaning: "我对金钱的恐惧或羞耻" },
    { index: 1, meaning: "金钱背后真正的渴望" },
    { index: 2, meaning: "丰盛的礼物" },
  ],
  recommendedQuestions: [
    "恐惧卡：这张卡呈现了你对金钱的什么感受？说不清道不明的部分是什么？",
    "渴望卡：在金钱背后，你真正渴望的是什么？（安全感、自由、被认可？）",
    "丰盛卡：自然界的丰盛（丰收、河流）如何疗愈你的匮乏感？",
  ],
  deckSlugs: ["classic", "ecco", "beauragard", "habitat"],
  introductionContent: `<p>金钱觉察牌阵探索潜意识中的金钱卡点、匮乏感与财富观。借助经典 OH 卡、抽象卡、博雷加德卡与自然环境卡，安全地触碰那些难以言说的金钱恐惧与羞耻，连接丰盛意象。</p>`,
  category: "心灵疗愈",
};

// ============ 所有牌阵集合 ============

export const SPREADS: Spread[] = [
  // 经典核心（含基础多套系牌阵）
  singleCard,
  threeCard,
  relationship,
  // 经典 OH 卡专属
  classicImageWord,
  shadowNourish,
  classicFiveDimensions,
  classicTimeFlow,
  classicCrossroads,
  classicInnerDialogue,
  classicRelationshipMap,
  classicWholeness,
  // 叙事与创意
  soloStory,
  storyChain,
  sagaHeroJourney,
  sagaInnerVillain,
  sagaGift,
  tale1001Wish,
  tale1001Labyrinth,
  tale1001Narrator,
  mythosArchetype,
  mythosFate,
  mythosMonster,
  chinamythFiveElements,
  chinamythTransformation,
  chinamythAncestors,
  tahitiParadise,
  tahitiColorSoul,
  tahitiPrimitive,
  // 心灵疗愈
  healheart3,
  healheartnurture,
  healhearBodyWisdom,
  copeCopingStyles,
  copeDaily,
  copeTransformation,
  eccoHope,
  eccoAbstractMirror,
  eccoFormless,
  eccoColorField,
  moneyAwareness,
  maskSpread,
  energyField,
  beauragardBlur,
  beauragardSubconscious,
  beauragardArtTherapy,
  resilioMap,
  resilioAnimalPower,
  resilioComeback,
  // 压力与复原
  stressResource,
  resilioIdentify,
  copeTrauma,
  // 自然与生活
  morenaGoal,
  morenaRoots,
  morenaNatureBody,
  morenaCommunity,
  habitatRoots,
  habitatEcosystem,
  habitatClimate,
  lifeRiver,
  cuisineHunger,
  cuisineRecipe,
  cuisineComfort,
  orcaDepth,
  orcaMigration,
  orcaPod,
  // 人物与关系
  familyTree,
  personaFamily,
  personaTime,
  childInnerChild,
  tandooCoupleMirror,
  tandooLoveLanguage,
  tandooConflict,
  tandooSignCouple,
  personaPortrait,
  personaRole,
  personaEncounter,
  personaPortraitInteract,
  childPlay,
  childSchool,
  childGrowing,
  childPortraitAction,
  // 双子套专属
  morenaImgTrack,
  resilioMainAnimal,
];

export const SPREAD_CATEGORIES = [
  "经典核心",
  "人物与关系",
  "心灵疗愈",
  "叙事与创意",
  "自然与生活",
] as const;

export function getSpreadBySlug(slug: string): Spread | undefined {
  return SPREADS.find((s) => s.slug === slug);
}
