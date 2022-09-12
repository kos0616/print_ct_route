import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";

createApp(App).mount("#app");

declare global {
  /** 步驟 */
  export type STEP = {
    /** 起點 */
    start: string;
    /** 終點 */
    end: string;
    /** 距離 */
    distance: string;
    /** 累積距離 */
    cumulative_distance: string;
    /** 配瓦 */
    wattage: string;
    /** 均速 */
    average_speed: string;
    /** 區段時間 */
    segment_time: string;
    /** 累計時間 */
    cumulative_time: string;
  };
}
