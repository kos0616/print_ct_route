import { ref, watch, type Ref } from "vue";

export type StepWithIcon = STEP & { icon?: string };

/** 可切換的指標欄位與其單位 */
export const METRIC_UNIT = {
  average_speed: "k/h",
  wattage: "w",
} as const;

export type Metric = keyof typeof METRIC_UNIT;

/**
 * 表格共用的列狀態。
 * 每個表格各自持有一份 STEPS 的複本，使用者在某張表上增刪列或加 icon
 * 都不會影響其他表格——這是刻意的，五張表是五份可獨立編輯的小抄。
 */
export function useSteps(source: Ref<STEP[]>) {
  const MY_STEPS = ref<StepWithIcon[]>([]);
  const active = ref<number | null>(null);

  /** 加入icon 若 icon 為同個圖樣，則移除 */
  const handleGetIcon = (icon: string) => {
    if (active.value === null) return;
    const row = MY_STEPS.value[active.value];
    row.icon = row.icon === icon ? "" : icon;
  };

  watch(
    source,
    (v) => {
      MY_STEPS.value = v.map((d) => ({ ...d }));
    },
    { immediate: true }
  );

  return { MY_STEPS, active, handleGetIcon };
}
