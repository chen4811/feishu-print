# CreateUser 创建人字段
::: danger
`CreateUser` 创建人字段**不支持手动往单元格写入值**。
:::
类型定义 `ICreateUserField`，使用方法示例：
```typescript
const createUserField = await table.getField<ICreateUserField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenUser = {
  id: string;
  name?: string;
  enName?: string;
  email?: string;
};
```

## getValue
获取创建人的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenUser[]>;
```

#### 示例 
```typescript
await createUserField.getValue('r_id');
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例 
```typescript
await createUserField.getCell('r_id');
```