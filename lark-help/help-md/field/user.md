# UserField 人员字段
类型定义 `IUserField`，使用方法示例：
```typescript
const userField = await table.getField<IUserField>(fieldId);
```
其中字段值的类型定义为：
```typescript
export type IOpenUser = {
  id: string; // open user_id
  name?: string; // 名称
  enName?: string; // 英文名
  email?: string; // 邮箱
};

type UserFieldTransformVal = IOpenUser | IOpenUser[];
```

## createCell
创建一个人员字段的 `Cell`。

```typescript
createCell: (val: UserFieldTransformVal) => Promise<ICell>;
```

#### 示例
```typescript
await userField.createCell({
  id: 'ou_xxxx'
});
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await userField.getCell('r_id');
```

## setValue
通过 `Record` 来设置对应的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: UrlTransformVal) => Promise<boolean>;
```

#### 示例
```typescript
await userField.setValue([
  {
    id: 'ou_xxxx1'
  },
  {
    id: 'ou_xxxx2'
  }
]);
```

## getValue
通过 `Record` 来获取对应的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenUser[]>;
```

#### 示例
```typescript
await userField.getValue('r_id');
```

## setMultiple
设置是否允许设置多个人员。

```typescript
setMultiple: (multiple: boolean) => Promise<IFieldRes>;
```

#### 示例
```typescript
await userField.setMultiple(false);
```

## getMultiple
获取是否允许设置多个人员属性值。

```typescript
getMultiple: () => Promise<boolean>;
```

#### 示例
```typescript
await userField.getMultiple();
// true
```