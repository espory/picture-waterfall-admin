import fetch from "./common/fetch";

export function postGetPics(limit, offset) {
  return fetch({
    url: "/pic/get",
    method: "get",
    params: {
      limit,
      offset,
    },
  });
}
