# Group 群组字段
类型定义 `IGroupField`，使用方法示例：
```typescript
const groupField = await table.getField<IGroupField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenGroupChat = {
  id: string;
  name: string;
  avatarUrl: string; // 群头像
  enName?: string;
  linkToken?: string; // 群链接 token
};
```

## createCell
创建一个群组字段的 `Cell`。

```typescript
createCell: (val: IOpenGroupChat[]) => Promise<ICell>;
```

#### 示例
```typescript
await groupField.createCell([
  {
    id: 'og_xxx',
    name: 'group_name'
  }
]);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await groupField.getCell('r_id');
```

## setValue
通过 `Record` 来设置指定单元格的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenGroupChat[]) => Promise<boolean>;
```

#### 示例
```typescript
await groupField.setValue('r_id', [
  {
    id: 'og_xxx',
    name: 'group_name'
  }
]);
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenGroupChat[]>;
```

#### 示例
```typescript
await groupField.getValue('r_id');
```

## setMultiple
设置是否可以多选。

```typescript
setMultiple: (multiple: boolean) => Promise<IFieldRes>;
```

#### 示例
```typescript
await groupField.setMultiple(true);
```

## getMultiple
获取是否可以多选。

```typescript
getMultiple: () => Promise<boolean>;
```

#### 示例
```typescript
await groupField.getMultiple();
```