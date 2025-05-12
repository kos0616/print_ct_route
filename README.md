# CT 路段配速小抄產生器

將 CT Yeh 的路段配速器的小抄印出，並可方便的貼在龍頭或上管

[demo](https://kos0616.github.io/print_ct_route/ "前往連結")

## 使用方法

1. 至 [CT Yeh 公路車基地](https://www.ctyeh.com/routelist) 完成配瓦、並點擊 **下載小抄** 取得 ride_plan.csv 檔案
2. 點擊工具的 **上傳 ride_plan.csv** 按鈕 (此工具無連接資料庫，不會儲存任何資訊，請放心使用)
3. 上傳後即產生列印預覽，可微調文字，最後點選 **列印小抄** 以取得 pdf 檔案
4. 將檔案印出後剪裁即可貼在龍頭，其它部分可留存紀念

## Update
對應csv新的文字格式，修正了無法正常顯示區段的 BUG

## Future

* [ ] 字形大小調整功能
* [ ] 文字顏色調整
* [ ] 表格顏色調整

## Dev

### Project setup

```

yarn install

```

#### Compiles and hot-reloads for development

```

yarn serve

```

#### Compiles and minifies for production

```

yarn build

```

#### Lints and fixes files

```

yarn lint

```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
