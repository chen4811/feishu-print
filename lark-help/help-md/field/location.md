# Location 地理位置字段
类型定义 `ILocationField`，使用方法示例：
```typescript
const locationField = await table.getField<ILocationField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenLocation = {
  address: string;
  adname: string;
  cityname: string;
  /** 简短地址 */
  name: string;
  /** 省 */
  pname: string;
  /** 完整地址 */
  fullAddress: string;
  /** 经纬度，格式为 "「精度」，「维度」" */
  location: string;
};
```

## createCell
创建一个地理位置字段的 `Cell`，**仅传入经纬度信息即可，底层会解析出该经纬度对应的位置信息**。

```typescript
createCell: (val: Partial<IOpenLocation>) => Promise<ICell>;
```

#### 示例
```typescript
await locationField.createCell({
  location: '112.946927,21.529146'
});
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await locationField.getCell('r_id');
```

## setValue
通过 `Record` 来设置指定单元格的值，**仅传入经纬度信息即可，底层会解析出该经纬度对应的位置信息**。

```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenLocation) => Promise<boolean>;
```

#### 示例
```typescript
await locationField.setValue('r_id', {
  location: '112.946927,21.529146'
});
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenLocation>;
```

#### 示例
```typescript
await locationField.getValue('r_id');
```

## setInputType
设置允许输入地址的方式。
```typescript
setInputType: (inputType: ELocationInputType) => Promise<IFieldRes>;
```
其中 `ELocationInputType` 的类型定义如下：
```typescript
enum ELocationInputType {
  ONLY_MOBILE = 'ONLY_MOBILE', // 只允许手机定位
  NOT_LIMIT = 'NOT_LIMIT', // 可获取任意位置
}
```

#### 示例
```typescript
await locationField.setInputType(ELocationInputType.ONLY_MOBILE);
```

## getInputType
获取输入地址的方式。

```typescript
getInputType: () => Promise<ELocationInputType>;
```

#### 示例
```typescript
await locationField.getInputType();
```