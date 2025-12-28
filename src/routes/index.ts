export const getUrlByPage = (pageName: string, params?: string) => {
  switch (pageName) {
    case "articles":
      return "/articles";
    case "article-details":
      return `/articles/${params}`;
    default:
      return "/";
  }
};
