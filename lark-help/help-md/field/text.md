# TextField 文本字段

类型定义 `ITextField`，使用方法示例：
```typescript
const textField = await table.getField<ITextField>(fieldId);
```

文本字段可以承载多个段落 `Segment`，段落 `Segment` 存在多种不同类型，目前支持`文本类型`、`URL 类型`、`人员类型`和`文档类型`。相关数据类型定义：
```typescript
type IOpenTextFieldValue = IOpenSegment[];

type IOpenSegment = IOpenTextSegment | IOpenUrlSegment | IOpenUserMentionSegment | IOpenDocumentMentionSegment;

/** 文本类型 */
interface IOpenTextSegment {
  type: IOpenSegmentType.Text; 
  text: string 
};

/** URL 类型 */
interface IOpenUrlSegment {
  type: IOpenSegmentType.Url;
  text: string;
  link: string;
};

/** 人员类型 */
interface IOpenUserMentionSegment {
  mentionType: 'User';
  text: string;
  token: string;
  /** 用户名 */
  name: string;
  enName?: string;
  /** 用户 id */
  id: string;
}

/** 文档类型 */
interface IOpenDocumentMentionSegment {
  mentionType: 'Doc' | 'Sheet' | 'Bitable' | '...'; 
  link: string;
  text: string;
  token: string;
}
```

## createCell
创建一个文本字段的 `Cell`，**对于文本和 URL 类型的段落，支持直接传递字符串**。

```typescript
createCell: (val: TextFieldTransformVal) => Promise<ICell>;
```

#### 示例
```typescript
// text segment
await textField.createCell('test');
// URL segment
await textField.createCell('https://www.feishu.cn');
```

## getCell
获取指定记录对应的 `Cell` 单元格。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const recordList = await table.getRecordList();

const cell = await textField.getCell(recordList[0]);
```

## setValue
设置指定单元格的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: TextFieldTransformVal) => Promise<boolean>;
```

#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

await textField.setValue(recordIdList[0], 'modify value');
```

## getValue
获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenSegment[]>;
```

#### 示例
```typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

const cellValue = await textField.getValue(recordIdList[0]);
```