export const affirmations = [
  "今日という日は、新しい可能性に満ちている",
  "私は今この瞬間を大切に生きている",
  "私には価値があり、愛される存在である",
  "困難は成長のための機会である",
  "私は自分のペースで前に進んでいる",
  "感謝の気持ちが私の心を豊かにする",
  "私は自分を信じ、自分の力を信頼している",
  "今日の小さな一歩が、明日の大きな変化につながる",
  "私は完璧である必要はない、ありのままで十分",
  "呼吸を整えることで、心も整う",
  "私の存在は、誰かにとっての光となっている",
  "失敗は学びであり、成功への道しるべ",
  "今この瞬間に意識を向けることで、心が穏やかになる",
  "私は日々成長し、より良い自分になっている",
  "周りの美しさに気づく余裕を持てている",
  "私の思考は私自身がコントロールできる",
  "ポジティブなエネルギーが私を包んでいる",
  "私は自分の人生の主人公である",
  "今日も一日、穏やかに過ごせることに感謝",
  "私は必要なすべてを既に持っている",
  "変化を恐れず、新しい自分を受け入れる",
  "私の心は愛と平和で満たされている",
  "今日という日を最高の一日にする力が私にはある",
  "私は自分自身に優しくすることを許可する",
  "すべての経験が私をより強くしている",
  "私の笑顔は周りの人を幸せにする",
  "今ここにいることの幸せを感じている",
  "私は自分の感情を受け入れ、大切にしている",
  "毎日が新しいスタートのチャンス",
  "私は自分らしく輝くことができる",
];

export const getRandomAffirmation = (): string => {
  const index = Math.floor(Math.random() * affirmations.length);
  return affirmations[index];
};

export const getDailyAffirmation = (): string => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % affirmations.length;
  return affirmations[index];
};
