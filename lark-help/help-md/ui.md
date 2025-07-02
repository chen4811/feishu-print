# UI 模块
`UI` 模块承载了用户交互相关的能力，获取方式为：
```typescript
const ui = bitable.ui;
```

## switchToTable
切换当前选中的数据表。

```typescript
switchToTable(tableId: string): Promise<boolean>;
```

#### 示例
```typescript
await bitable.ui.switchToTable('table_id');
```

## switchToView
切换至指定 `Table(数据表)` 下指定的 `View(视图)`，该视图必须从属于数据表，否则会调用失败。


```typescript
switchToView(tableId: string, viewId: string): Promise<boolean>;
```

#### 示例
```typescript
await bitable.ui.switchToView('table_id', 'view_id');
```

## selectRecordIdList

交互式选择记录，调用这个 API 时会在全局唤起选择记录的对话框，如下图所示。用户选择完记录后点击确定，接口返回值会返回已选择记录的记录 ID 列表。

![选择记录对话框](../../image/ui/select_record_id.png)

```typescript
selectRecordIdList(tableId: string, viewId: string): Promise<string[]>;
```

#### 示例
```typescript
const { tableId, viewId } = await bitable.base.getSelection();
const recordIdList = await bitable.ui.selectRecordIdList(tableId, viewId);
const table = await bitable.base.getActiveTable();
const recordValList = [];
for (const recordId of recordIdList) {
  recordValList.push(await table.getRecordById(recordId));
}
```

## showToast


全局消息提示，调用这个 API 时会在全局提示一条消息，如下图所示。
![toast](../../image/ui/ui_toast.png)

```typescript
showToast(options: ShowToastOptions): Promise<boolean>;
```

相关类型定义如下：
```typescript
type ShowToastOptions = {
  toastType?: ToastType,
  message: string,
};

enum ToastType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  loading = 'loading',
}
```

#### 示例
```typescript
await bitable.ui.showToast({
  toastType: ToastType.info,
  message: 'hello world'
})
```

## showRecordDetailDialog
展示指定数据表指定记录的详情弹窗，默认展示所有字段，支持指定需要展示的字段列表。
![showRecordDetailDialog](../../image/ui/record_detail_dialog.png)

```typescript
showRecordDetailDialog(params: { tableId: string, recordId: string, fieldIdList?: string[] } ): Promise<boolean>;
```

 示例
```typescript
await bitable.ui.showRecordDetailDialog({ tableId: 't_id', recordId: 'r_id' });
```

##  getSelectOptionColorInfoList
获取多维表格内置的 **55** 种选择字段中的选项颜色信息，包括选项的背景色，选中态颜色等。

```typescript
getSelectOptionColorInfoList(): Promise<ISelectOptionColor[]>;
```

其中 `ISelectOptionColor` 类型定义如下：
```typescript
interface ISelectOptionColor {
    /** 颜色方案id，可用范围为0 - 54 */
    id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54;
    /** 同css 16进制颜色值，选项的背景色
     * @example '#ff0000' 纯红色
     */
    bgColor: string;
    /** 同css 16进制颜色值，文字的颜色
     * @example '#ff0000' 纯红色
     */
    textColor: string;
    /** 同css 16进制颜色值，表格中删除选项时的x图标的颜色
     * @example '#ff0000' 纯红色
     */
    iconColor: string;
    /** 同css 16进制颜色值，表格中删除选项时的x图标hover时候的颜色
     * @example '#ff0000' 纯红色
     */
    iconAltColor: string;
}
```

#### 示例
```typescript
const selectOptColorInfo = await bitable.ui.getSelectOptionColorInfoList();
```