# 错误码

通常在接口调用出现错误时可以根据 Error 中的错误码来定位出错的具体原因：
```typescript
try {
  await bitable.base.getTableById('xxx');
} catch (e) {
  const { message, code } = e;
  // handle error
  // Toast.error(message);
}
```

下表列出了所有的错误码分类：
```typescript
export enum ErrorCode {
  /** table */
  TableNotLoadedError = 10212001,
  LastTableDeleteForbiddenError = 10212002,
  TableParamExceptionError = 10212992,
  TableNameRepeatedError = 10212995,
  TablePermissionDeniedError = 10212997,
  TableNotFoundError = 10212998,
  TableUnknownError = 10212999,
  /** field */
  FieldTypeUnSupportedError = 10213991,
  FieldNameRepeatedError = 10213995,
  FieldPermissionDeniedError = 10213997,
  FieldNotFoundError = 10213998,
  FieldUnknownError = 10213999,
  /** record */
  SingleRecordOperationLimitExceeded = 10214001,
  RecordPermissionDeniedError = 10214997,
  RecordNotFoundError = 10214998,
  RecordUnknownError = 10214999,
  /** view */
  LastViewDeleteForbiddenError = 10215001,
  ViewTypeUnSupportedError = 10215991,
  ViewNameRepeatedError = 10215995,
  ViewPermissionDeniedError = 10215997,
  ViewNotFoundError = 10215998,
  ViewUnknownError = 10215999,
  /** cell */
  CellPermissionDeniedError = 10216997,
  CellUnknownError = 10216999,
}
```