# UrlField 超链接字段
类型定义 `IUrlField`，使用方法示例：
```typescript
const urlField = await table.getField<IUrlField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenUrlSegment = {
  type: IOpenSegmentType.Url;
  text: string;
  link: string;
};

export type UrlTransformVal = string | IOpenUrlSegment | IOpenUrlSegment[];
```

## createCell
创建一个链接字段的 `Cell`，开发者只需要输入文本就可以指定转化为指定格式，其中 URL 链接会转化为对应的超链接。

```typescript
createCell: (val: UrlTransformVal) => Promise<ICell>;
```

#### 示例
```typescript
const cell = await urlField.createCell('https://lark-base-team.github.io/js-sdk-docs');
```

## getCell
通过指定 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
const recordIdList = await table.getRecordIdList();

const cell = await urlField.getCell(recordIdList[0]);
```

## setValue
通过 `Record` 来设置对应单元格 `Cell` 的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: UrlTransformVal) => Promise<boolean>;
```

#### 示例
```typescript
const recordIdList = await table.getRecordIdList();

await urlField.setValue(recordIdList[0], 'https://lark-base-team.github.io/js-sdk-docs');
```

## getValue
通过 `Record` 来获取对应单元格 `Cell` 的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenUrlSegment[]>;
```

#### 示例
```typescript
const recordIdList = await table.getRecordIdList();

await urlField.getValue(recordIdList[0]);
```