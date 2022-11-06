import { ipcRenderer } from "electron";

const BiliCSRF = "bili_jct";
const domain = ".bilibili.com";

export function getBiliCSRF() {
  return ipcRenderer.sendSync("getCookie", {
    name: BiliCSRF,
    domain: domain,
  }).value;
}

export function clearCookie() {
  return ipcRenderer.send("clearCookie", { url: "/", name: BiliCSRF });
}
