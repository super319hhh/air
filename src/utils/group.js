const groupBy = (array, f) => {
  let groups = {};
  array.forEach(function (o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
};

export const arrayGroupBy = (list, groupId) => {
  let sorted = groupBy(list, function (item) {
    return [item[groupId]];
  });
  return sorted;
};
