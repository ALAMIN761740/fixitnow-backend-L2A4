export const getPagination = (page?: number, limit?: number) => {
    const pageNum = (page && page > 0) ? page : 1;
    const perPage = (limit && limit > 0) ? limit : 10;
    const skip = (pageNum - 1) * perPage;
    return { skip, take: perPage };
};
