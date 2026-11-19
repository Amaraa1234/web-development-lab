// Даалгавар 3: spread, destructuring, rest; оролтыг өөрчлөхгүй
export const pick = (obj, ...keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));
export const omit = (obj, ...keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
export const merge = (a, b) => ({ ...a, ...b });
export const withDefaults = (obj, defaults) => ({ ...defaults, ...obj });
export const updatePhoto = (photo, changes) => ({ ...photo, ...changes });
export const addTag = (photo, tag) =>
  photo.tags.includes(tag) ? { ...photo, tags: [...photo.tags] } : { ...photo, tags: [...photo.tags, tag] };
export const removeTag = (photo, tag) => ({ ...photo, tags: photo.tags.filter(t => t !== tag) });
export const describe = ({ title, place, ...rest }) => `${title} (${place}) — ${Object.keys(rest).length} талбар`;
