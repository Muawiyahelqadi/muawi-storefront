export const getUrlByPage = (pageName: string) => {
  switch (pageName) {
    case "articles":
      return "/articles";
    default:
      return "/";
  }
};
