
function getObjectPaths(data: any, paths: string[], keys: string[]) {
  Object.keys(data).forEach((key: string) => {
    const value: any = data[key];
    if (typeof value === 'object') {
      getObjectPaths(value, paths, [...keys, key])
    } else {
      const fullpath = [...keys, key].join('.');
      paths.push(fullpath);
    }
  })
  return paths;
}

export default (data: object) => {
  return getObjectPaths(data, [], []);
}