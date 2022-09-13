# CT 路段配速小抄產生器

將 CT Yeh 的路段配速器的小抄印出，並可方便的貼在龍頭或上管

[demo](https://kos0616.github.io/print_ct_route/ "前往連結")

## 使用方法

1. 至 [CT Yeh 公路車基地](https://www.ctyeh.com/routelist) 完成配瓦、並點擊 **下載小抄** 取得 ride_plan.csv 檔案
2. 點擊工具的 **上傳 ride_plan.csv** 按鈕 (此工具無連接資料庫，不會儲存任何資訊，請放心使用)
3. 上傳後即產生列印預覽，可微調文字，最後點選 **列印** 以取得 pdf 檔案
4. 將檔案印出後剪裁即可貼在龍頭，其它部分可留存作紀念以便於日後統計

## todos

1. [X] 上傳
2. [X] 格式化
3. [X] 表格產生
4. [X] 表格自由編輯
5. [X] 列印測試
6. [X] 敘述與縮圖等等
7. [ ] 字形大小調整功能
8. [ ] 國際化
9. [X] 備註用空白處
1. [X] 緊急聯絡人填寫處

## 自行開發使用手冊

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
