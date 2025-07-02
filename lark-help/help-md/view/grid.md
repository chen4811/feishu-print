# GridView 表格视图

## id
当前视图的 id。

## tableId
当前视图所属的数据表 id。

## getName
获取视图名。

```typescript
getName(): Promise<string>;
```

## getType
获取视图类型。
```typescript
getType(): Promise<ViewType.Grid>;
```

## getMeta
获取表格视图元信息。

```typescript
getMeta(): Promise<IGridViewMeta>;
```
其中 `IGridViewMeta` 类型定义为：

```typescript
interface IGridViewMeta {
    id: string;
    name: string;
    type: ViewType.Grid;
    property: {
        hierarchyConfig: {
            fieldId: string | undefined;
        };
        filterInfo: IFilterInfo | null;
        sortInfo: ISortInfo[];
        groupInfo: IGroupInfo[];
    }
}
```

## getFieldMetaList
获取字段信息的列表，因为 `View` 层涉及到了 `UI` 的展示，所以此时获取的字段信息是有序的。

```typescript
getFieldMetaList(): Promise<IFieldMeta[]>;
```

## getVisibleRecordIdList
获取可见记录的 ID 列表。

```typescript
getVisibleRecordIdList(): Promise<(string | undefined)[]>;
```

## getVisibleFieldIdList
获取可见字段的 ID 列表。

```typescript
getVisibleFieldIdList(): Promise<string[]>;
```

## getSelectedRecordIdList
获取当前选中的所有记录 ID 列表。

```typescript
getSelectedRecordIdList(): Promise<string[]>;
```

## applySetting
将设置的分组/筛选/排序等视图配置提交，同步给其他用户。

```typescript
applySetting(): Promise<void>;
```

## getChildRecordIdList
获取指定记录的子记录 id 列表, undefined 则表示该记录无子记录。

```typescript
getChildRecordIdList(parentRecordId: string): Promise<RecordId[] | undefined>;
```

## getFilterInfo
获取当前的筛选信息([IFilterInfo 定义](../view.md#ifilterinfo))。

```typescript
getFilterInfo(): Promise<IFilterInfo | null>;
```

## addFilterCondition
新增筛选条件，如果新增失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting))。

```typescript
addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
```

## deleteFilterCondition
删除筛选条件，如果删除失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting))。

```typescript
deleteFilterCondition: (conditionId: string) => Promise<boolean>;
```

## updateFilterCondition
更新筛选条件，如果更新失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting))。

```typescript
updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
```

## setFilterConjunction
```typescript
setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
```
设置筛选条件之间的关系，其中 FilterConjunction 类型定义为:
```typescript
enum FilterConjunction {
    And = "and",
    Or = "or"
}
```
可以选择满足所有筛选条件或者其中某条件 (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting))

## getSortInfo
获取当前的排序条件([sortInfo定义](../view.md#isortinfo))。

```typescript
getSortInfo(): Promise<ISortInfo[]>;
```

## setAutoSort
设置是否自动进行排序（在设置了排序条件之后，会自动设置为 true, 调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting))。

```typescript
setAutoSort(param: boolean): Promise<boolean>;
```

## addSort
新增排序条件（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting)）。

```typescript
addSort: (param: ISortInfo | ISortInfo[]) => Promise<boolean>;
```

## deleteSort
删除排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting)）。

```typescript
deleteSort: (param: ISortInfo | string) => Promise<boolean>;
```

## updateSort
更新排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting)）。

```typescript
updateSort: (param: ISortInfo) => Promise<boolean>;
```

## getGroupInfo
获取分组信息([IGroupInfo定义](../view.md#igroupinfo))。
```typescript
getGroupInfo(): Promise<IGroupInfo[]>;
```

## addGroup
新增分组 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting)）。

```typescript
addGroup: (param: IGroupInfo | IGroupInfo[]) => Promise<boolean>;
```

## deleteGroup
删除分组 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting)）。

```typescript
deleteGroup: (param: string | IGroupInfo) => Promise<boolean>;
```

## updateGroup
更新分组（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting)）。

```typescript
updateGroup: (param: IGroupInfo) => Promise<boolean>;
```

## showField
显示字段。

```typescript
showField: (fieldId: string | string[]) => Promise<boolean>;
```

## hideField
隐藏字段。

```typescript
hideField: (fieldId: string | string[]) => Promise<boolean>;
```

## getFieldWidth
获取字段宽度。

```typescript
getFieldWidth(fieldId: string): Promise<number>;
```

## setFieldWidth
设置字段宽度。

```typescript
setFieldWidth(fieldId: string, width: number): Promise<boolean>;
```

## setRowHeight
设置行高，目前行高按照从矮到高有以下几种 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./grid.md#applysetting)）。

```typescript
setRowHeight(rowHeight: RowHeightLevel): Promise<boolean>;
```

```typescript
enum RowHeightLevel {
    Short = 1,
    Medium = 2,
    Tall = 3,
    ExtraTall = 4
}
```