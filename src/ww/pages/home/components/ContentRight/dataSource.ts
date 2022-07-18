interface DataModel {
  item: string;
  user: string;
  score: number;
}
const abilityNames = [
  '对线能力',
  '发育能力',
  '团战能力',
  '抗压能力',
  '装杯能力',
];
const names = [
  '简阳第一莽夫',
  '简阳第一村夫',
  '魏老师带你飞',
  '小龙撞击',
  '芳心纵火犯',
  '呜啦呜啦',
];
const points = [
  [99, 80, 92, 80, 95],
  [95, 75, 90, 60, 99],
  [80, 70, 70, 95, 80],
  [90, 80, 80, 85, 99],
  [95, 85, 90, 90, 90],
  [75, 95, 80, 80, 99],
];
const itemProvider = (itemStr: string, itemIndex: number) => {
  return names.map(function (user, index) {
    return {
      item: itemStr,
      user,
      score: points[index][itemIndex],
    };
  });
};
const dataProvider = () => {
  const data: DataModel[] = [];
  abilityNames.forEach((item, index) => {
    data.push(...itemProvider(item, index));
  });
  return data;
};
export const dataSource = dataProvider();
