import Course from "../models/course";

type PaginationQuery = {
  page?: string;
  limit?: string;
};

const handlePage = async (query: PaginationQuery) => {
  try {
    const page = Math.max(1, parseInt(query.page || "1"));
    const limit = Math.max(1, parseInt(query.limit || "10"));
    const offset = (page - 1) * limit;

    const items = await Course.find().skip(offset).limit(limit);
    const totalItems = await Course.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      page: page,
      litmit: limit,
      totalItems: totalItems,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      items: items,
    };
  } catch (err) {
    console.log(err);
  }
};

export { handlePage };
