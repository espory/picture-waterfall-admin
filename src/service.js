import fetch from "./common/fetch";

export function postGetPics(limit, offset) {
  return fetch({
    url: "/pic/get",
    method: "get",
    params: {
      limit,
      offset,
      isAdmin: true,
    },
  });
}
export function getItemTotal() {
  return fetch({
    url: "/pic/getItemTotal",
    method: "get",
    params: {},
  });
}
export function postDelPic(id) {
  return fetch({
    url: "/pic/del",
    method: "post",
    data: {
      id,
    },
  });
}
/**
 * @description: 用于创建文件
 * @param {*} fileInfoList: tmpPath,username,title,intro,type,other
 * @return {*}
 */
// export function postCreateFiles(fileInfoList) {
//   return fetch({
//     url: "/pic/create",
//     method: "post",
//     data: {
//       fileInfoList,
//     },
//   });
// }
