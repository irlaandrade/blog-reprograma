const getNewValue = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

const newDate = () => new Date().toString();

const checkTag = (array, tag) => {
  return array.find((post) => post.tag == tag);
};

const checkTitle = (array, title) => {
  return array.find((post) => post.title == title);
};

module.exports = {
  getNewValue,
  newDate,
  checkTag,
  checkTitle
};
