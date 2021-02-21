const postModel = require("../models/posts-models");
const helper = require("../helpers/helper");

const getAll = (req, res) => {
  res.status(200).json(postModel);
};

const getById = (req, res) => {
  const { id } = req.params;
  res.status(200).json(postModel.find((post) => post.id == id));
};

const createPost = (req, res) => {
  let { title, content, tags } = req.body;

  let newsTags = [];
  let repeated = false;

  tags.forEach((tag) => {
    if (!newsTags.includes(tag)) {
      newsTags.push(tag);
    } else {
      repeated = true;
    }
  });

  if (repeated) {
    res.status(400).json({ mensagem: "Não é possível inserir tags repetidas!" });
    return;
  }

  let newPost = {
    id: helper.getNewValue(postModel),
    dataCriacao: helper.newDate(postModel),
    title: title,
    content: content,
    tags: tags,
  };

  postModel.push(newPost);
  res.status(201).json(newPost);

};

const updatePost = (req, res) => {
  const { id } = req.params;
  const getKeys = Object.keys(req.body);

  const findPostUpdate = postModel.find((post) => post.id == id);

  const searchByTag = helper.checkTag(postModel, req.body["tag"]);
  if (searchByTag && findPostUpdate.id != searchByTag.id) {
    res.status(400).json({ mensagem: `Essa tag já existe! Não será possível atualizar a postagem.` });
  } else {
    const index = postModel.indexOf(findPostUpdate);

    getKeys.forEach((key) => {
      findPostUpdate[key] = req.body[key];
    });

    postModel[index] = findPostUpdate;
    res.status(200).json(postModel[index]);
  }
};

const updateTitle = (req, res) => {
  const { id } = req.params;
  const getKeys = Object.keys(req.body);
  const findPost = postModel.find((post) => post.id == id);

  const searchByTitle = helper.checkTitle(postModel, req.body["title"]);

  if (searchByTitle && findPost.id != searchByTitle.id) {
    res.status(400).json({ mensagem: `Esse título já existe!` });
  } else {
    const index = postModel.indexOf(findPost);

    getKeys.forEach((key) => {
      findPost[key] = req.body[key];
    });

    postModel[index] = findPost;
    res.status(200).json(postModel[index]);
  }
};

const updateTag = (req, res) => {
  const { id } = req.params;
  const getKeys = Object.keys(req.body);
  const findPost = postModel.find((post) => post.id == id);

  const index = postModel.indexOf(findPost);

  getKeys.forEach((key) => {
    findPost[key] = req.body[key];
  });

  postModel[index] = findPost;
  res.status(200).json(postModel[index]);
};

const deletePost = (req, res) => {
  const { id } = req.params;
  const postIndex = postModel.findIndex((post) => post.id == id);função

  postModel.splice(postIndex, 1);
  res.status(200).json(postModel);
};

module.exports = {
  getAll,
  getById,
  createPost,
  updatePost,
  updateTitle,
  updateTag,
  deletePost,
};
