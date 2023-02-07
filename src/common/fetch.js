import axios from "axios";
export const HOST =
  process.env.NODE_ENV === "development"
    ? "http://192.168.3.5:8000"
    : "http://101.43.119.45:8000";
console.log(HOST);

export default function fetch(option = {}) {
  const { url, ...rest } = option;
  return axios({
    url: `${HOST}${url}`,
    withCredentials: true,
    ...rest,
  })
    .then((res) => {
      const { status, data } = res;
      if (status !== 200) {
        console.error("服务器错误，请重试");
        return Promise.reject(new Error("服务器错误，请重试"));
      }
      return data;
    })
    .catch((e) => {
      console.error("服务器错误，请重试", e);
    });
}
