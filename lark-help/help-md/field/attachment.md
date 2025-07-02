# Attachment 附件字段
类型定义 `IAttachmentField`，使用方法示例：
```typescript
const attachmentField = await table.getField<IAttachmentField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenAttachment = {
  name: string;
  size: number;
  type: string; // mime
  token: string;
  timeStamp: number;
  /** 高级权限下附件接口依赖的信息，可能为空 */
  permission?: {
    tableId: string;
    recordId: string;
    fieldId: string;
  }
};

type AttachmentTransformVal = File | File[] | FileList | IOpenAttachment | IOpenAttachment[];
```

## getAttachmentUrls
::: warning
该接口返回的临时链接的有效时间是 **10 分钟**。
:::
通过 记录 Record (`id` 或者 `Record` 对象) 信息，获取附件的 URL 地址(URL 有效期为 10 分钟)。

```typescript
getAttachmentUrls: (recordOrId: IRecordType | string) => Promise<string[]>;
```
#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentUrls = await attachmentField.getAttachmentUrls(recordId);
```

## setOnlyMobile
设置是否只允许移动端上传，传入为 `true` 的时候设置为仅允移动端上传文件。
```typescript
setOnlyMobile: (onlyMobile: boolean) => Promise<boolean>;
```
#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
await attachmentField.setOnlyMobile(true);
```

## getOnlyMobile
获取是否只允许移动端上传的属性值。
```typescript
getOnlyMobile: () => Promise<boolean>;
```
#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const isOnlyMobile = await attachmentField.getOnlyMobile();
```

## createCell
创建一个附件单元格，可以直接传入文件 `File` 来实现构造一个单元格。
```typescript
createCell: (val: AttachmentTransformVal) => Promise<ICell>;
```
#### 示例
```typescript
const file = new File(['text'], 'file_name.txt', { type: "text/plain" });

const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentCell = await attachmentField.createCell(file);
const recordId = await table.addRecord(attachmentCell);
```

## getCell
获取一个附件单元格，可以传入记录(`record`)的 `id` 或者实例。
```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>
```
#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentCell = await attachmentField.getCell(recordId);
```

## setValue
通过 `Record` 设置 `Value`，支持直接传入文件 `File`。
```typescript
setValue: (recordOrId: IRecordType | string, val: AttachmentTransformVal) => Promise<boolean>;
```

#### 示例
```typescript
const file = new File(['text'], 'file_name.txt', { type: "text/plain" });

const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
await attachmentField.setValue(recordId, file);
```

## getValue
通过 `Record` 获取指定单元格所有的附件。
```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenAttachment[]>;
```

#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const val = await attachmentField.getValue(recordId);
```