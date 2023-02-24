import fetch from "./common/fetch";

export function postGetPics(limit, offset) {
  return fetch({
    url: "/pic/admin/index",
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
    url: "/pic/admin/getItemTotal",
    method: "get",
    params: {},
  });
}
export function postDelPic(id) {
  return fetch({
    url: "/pic/admin/del",
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
    url: "/pic/admin/update",
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
//     url: "/pic/admin/create",
//     method: "post",
//     data: {
//       fileInfoList,
//     },
//   });
// }
