import News from "../models/News.js";

const createServiceNews = (body) => News.create(body);

const findAllService = (offset, limit) =>
  News.find().sort({ id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => News.countDocuments();

const topNewsService = () =>
  News.findOne()
    .sort({ _id: -1 }) // ou sort({ createdAt: -1 }) se tiver timestamp
    .populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const searchByTitleService = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ id: -1 })
    .populate("user");

const byUserService = (id) =>
  News.find({ user: id }).sort({ id: -1 }).populate("user");

export {
  createServiceNews,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
};
