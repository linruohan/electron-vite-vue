import { createVNode, render } from "vue";
import Toast from "../toast.vue";

const div = document.createElement("div");
div.setAttribute("class", "toast");
document.body.appendChild(div);

let time: any = null;
export const toast = (text: string, duration: number = 2500) => {
    const NODE = createVNode(Toast, { text });
    render(NODE, div);
    clearTimeout(time);
    time = setTimeout(() => {
        render(null, div);
    }, duration);
};

