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
 * @description: 修改图片信息
 * @param {*} id
 * @param {*} attrName 属性名
 * @param {*} value
 * @return {*}
 */
export function postChangePic(id, attrName, value) {
  return fetch({
    url: "/pic/update",
    method: "post",
    data: {
      id,
      attrName,
      value,
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
