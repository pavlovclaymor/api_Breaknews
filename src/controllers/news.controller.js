import {
  createServiceNews,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateServiceNews,
  eraseService,
  lineNewsService,
  deleteLikeNewsService
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner)
      return res
        .status(400)
        .send({ message: "Submit all fields for registration" });

    await createServiceNews({ title, text, banner, user: req.userId });
    res.status(201).send("Created");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await findAllService(offset, limit);
    const currentURL = req.baseURL;

    const total = await countNews();
    const next = offset + limit;
    const nextURL =
      next < total ? `${currentURL}?limit=${limit}&offset=${offset}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousURL =
      previous != null
        ? `${currentURL}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ message: "there are not news field" });
    }

    res.status(200).send({
      nextURL,
      previousURL,
      limit,
      offset,
      total,

      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.name,
        userName: item.userName,
        useravatar: item.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news)
      return res.status(400).send({ message: "There is no registered post" });

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.userName,
        useravatar: news.user.avatar,
      },
    });
  } catch (er) {
    res.status(500).send({ message: er.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id);

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.userName,
        useravatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

    if (news.length === 0)
      return res
        .status(400)
        .send({ message: "There are no news with this title" });

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.name,
        userName: item.userName,
        useravatar: item.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id)

     return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.name,
        userName: item.userName,
        useravatar: item.avatar,
      })),
    })

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner)
      return res
        .status(400)
        .send({ message: "Submit least one field for registration" });

    const news = await findByIdService(id);

  
    
    if (news.user._id.toString() != req.userId.toString())
      return res.status(401).send({ message: "Unauthorized" });

    await updateServiceNews(id, title, text, banner);
    res.status(200).send("Updated");
  } catch (err) {
    res.status(500).send({ message: "update "+ err.message });
  }
};

const erase = async (req, res)=>{
  try {
    const { id } = req.params

    const news = await findByIdService(id);
    if (news.user._id.toString() != req.userId.toString())
      return res.status(401).send({ message: "You did't delete this news" });

    await eraseService(id);
    return res.send("Deleted news");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const likeNews = async  (req,res)=>{
  try{
     const { id } = req.params;
   const userId = req.userId;

   const newsLiked = await lineNewsService(id, userId);
    if (!newsLiked) {
      await deleteLikeNewsService(id, userId);
      res.status(201).send({message: "Disliked news"});
    }
    console.log(newsLiked);

    res.status(200).send({message: "Liked news"});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews };
