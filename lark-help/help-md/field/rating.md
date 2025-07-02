# Rating 评分字段
类型定义 `IRatingField`，使用方法示例：
```typescript
const ratingField = await table.getField<IRatingField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenNumber = number;
```

## createCell
创建一个评分字段的 `Cell`，**写入的评分值需要落在字段配置的最小值和最大值之间**。
```typescript
createCell: (val: IOpenNumber) => Promise<ICell>;
```

#### 示例
```typescript
await ratingField.createCell(5);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。
```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await ratingField.getCell('r_id');
```

## setValue
通过 `Record` 来设置指定单元格的值，**写入的评分值需要落在字段配置的最小值和最大值之间**。
```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenNumber) => Promise<boolean>;
```

#### 示例
```typescript
// eg: min~max => 0~5
await ratingField.setValue('r_id', 4);
```

## getValue
通过 `Record` 来获取指定单元格的值。
```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenNumber>;
```

#### 示例
```typescript
await ratingField.getValue('r_id');
```

## getMin
获取设置的评分最小值，**最小值取值范围 0~1**。
```typescript
getMin: () => Promise<number>;
```
#### 示例
```typescript
await ratingField.getMin();
```

## setMin
设置评分最小值，**最小值取值范围 0~1**。
```typescript
setMin: (min: number) => Promise<IFieldRes>;
```
#### 示例
```typescript
await ratingField.setMin(0);
```

## getMax
获取设置的评分最大值，**最大值取值范围 1~10**。
```typescript
getMax: () => Promise<number>;
```

#### 示例
```typescript
await ratingField.getMax();
```

## setMax
设置评分最大值，**最大值取值范围 1~10**。
```typescript
setMax: (max: number) => Promise<IFieldRes>;
```

#### 示例
```typescript
await ratingField.setMax(10);
```

## getRatingIcon
获取评分字段的 ICON。
```typescript
getRatingIcon: () => Promise<RatingIconType>;
```
其中 `RatingIconType` 的值为：
```typescript
enum RatingIconType {
  STAR = 'star',
  HEART = 'heart',
  THUMBSUP = 'thumbsup',
  FIRE = 'fire',
  SMILE = 'smile',
  LIGHTNING = 'lightning',
  FLOWER = 'flower',
  NUMBER = 'number',
}
```

#### 示例
```typescript
await ratingField.getRatingIcon();
```

## setRatingIcon
设置评分字段的 ICON。

```typescript
setRatingIcon: (icon: RatingIconType) => Promise<IFieldRes>;
```

#### 示例
```typescript
await ratingField.setRatingIcon(RatingIconType.FLOWER);
```