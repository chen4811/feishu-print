# Base 模块
当前多维表格实例，多维表格相关 API 的主入口。

```typescript
import { bitable } from '@lark-base-open/js-sdk';

const base = bitable.base;
```

## 读接口
### isEditable
是否可以编辑当前多维表格。
```typescript
isEditable(): Promise<boolean>;
```
##### 示例
```typescript
const isEditable = await base.isEditable();
```

### getSelection
获取当前多维表格激活的相关信息（当前文档 id、数据表 id、视图 id 等）。

```typescript
getSelection: () => Promise<Selection>;

interface Selection {
  baseId: string | null, 
  tableId: string | null,
  fieldId: string | null,
  viewId: string | null, 
  recordId: string | null
}
```

#### 示例
```typescript
const selection = await bitable.base.getSelection();
```

### getActiveTable
获取当前选中的数据表 `table`。

```typescript
getActiveTable: () => Promise<ITable>;
```
#### 示例
```typescript
const table = await base.getActiveTable();
```

### getTable
获取指定数据表 `table`，支持传入 `table` 的 id 或名称。

```typescript
getTable(idOrName: string): Promise<ITable>
```

#### 示例
```typescript
// 传入 table id
const table = await base.getTable('t_idxxxx');
// 传入 table name
const table = await base.getTable('Table_For_Test');
```

### getTableById
通过数据表 `id` 来获取指定数据表。

```typescript
getTableById(tableId: string): ITable;
```
#### 示例
```typescript
const table = await base.getTableById('t_idxxxx');
```

### getTableByName
通过数据表名称获取指定数据表。

```typescript
getTableByName(name: string): Promise<ITable>
```
#### 示例
```typescript
const table = await base.getTableByName('Table_For_Test');
```

### getTableList
获取当前多维表格下所有的数据表。

```typescript
getTableList(): Promise<ITable[]>;
```
#### 示例
```typescript
const tableList = await base.getTableList();
```

### getTableMetaById
通过 id 获取指定数据表的元信息。

```typescript
getTableMetaById(tableId: string): Promise<ITableMeta>
```

##### 示例
```typescript
const tableMeta = await base.getTableMetaById('t_id');
```

### getTableMetaList
获取当前多维表格下所有数据表元信息。

```typescript
getTableMetaList(): Promise<ITableMeta[]>
```

##### 示例
```typescript
const tableMetaList = await base.getTableMetaList();
```

### getPermission
获取 Base、Table、Field、Record、Cell 等不同实体的权限，当返回 true 的时候表示有权限，返回为 false 的时候没有权限。
```typescript
getPermission(params: GetPermissionParams): Promise<boolean>;
```

其中 `GetPermissionParams` 的类型定义如下：
```typescript
type GetPermissionParams = BasePermissionParams | TablePermissionParams | RecordPermissionParams | FieldPermissionParams | CellPermissionParams;

interface BasePermissionParams {
  entity: PermissionEntity.Base;
  type: BaseOperation;
}

interface TablePermissionParams {
  entity: PermissionEntity.Table;
  param: {
    tableId?: string;
  };
  type: TableOperation;
}

interface RecordPermissionParams {
  entity: PermissionEntity.Record;
  param: {
    tableId: string;
    recordId?: string;
  };
  type: RecordOperation;
}

interface FieldPermissionParams {
  entity: PermissionEntity.Field;
  param: {
    tableId: string;
    fieldId?: string;
  };
  type: FieldOperation;
}

interface CellPermissionParams {
  entity: PermissionEntity.Cell;
  param: {
    tableId: string;
    recordId?: string;
    fieldId?: string;
  };
  type: CellOperation;
}
```

#### 示例
使用的时候，需要传入对应的配置，来查询对应的权限, 下面展示一个`查询字段编辑权限`的例子：

```typescript
import { PermissionEntity, OperationType } from '@lark-base-open/js-sdk';

const fieldInfo: FieldPermissionParams = {
  entity: PermissionEntity.Field,
  param: {
    tableId,
    fieldId,
  },
  type: OperationType.Editable,
}
const hasPermission = await base.getPermission(params);
```

## 写接口
### addTable
添加数据表，支持设置表名和字段，返回创建成功数据表的 id 和索引位置。
:::warning
暂不支持配置字段，可以创建数据表后通过 [Table 模块](./table.md)中的方法添加字段。
:::
```typescript
addTable(config: IAddTableConfig): Promise<{ tableId: string, index: number }>;

interface IAddTableConfig {
  name: string; // 表名
}
```
#### 示例
```typescript
const { tableId, index } = await bitable.base.addTable({
    name: '测试添加数据表'
})
```

### setTable
修改数据表，目前仅支持修改数据表的名称，修改成功会返回当前被修改数据表 id。

```typescript
setTable(tableId: string, config: ISetTableConfig): Promise<string>;

interface ISetTableConfig {
  name: string; // 表名
}
```
#### 示例
```typescript
const tableId = await bitable.base.setTable({
    name: '修改数据表'
})
```

### deleteTable
删除指定数据表。

```typescript
deleteTable(tableId: string): Promise<boolean>;
```
#### 示例
```typescript
const table = await bitable.base.getActiveTable();

await bitable.base.deleteTable(table.id);
```

### batchUploadFile
批量上传文件，按序返回每个文件对应的 fileToken 列表，支持传入 [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 数组或 [FileList](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 对象。
```typescript
batchUploadFile(file: File[] | FileList): Promise<string[]>;
```
#### 示例
```typescript
// 文件上传限制
// file name 长度不得大于 250
// file size 不得大于 1024 * 1024 * 1024 * 2

const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
const tokens =await bitable.base.batchUploadFile([file]); // 拿到的 token 可以用于设置附件字段
console.log(tokens) // ['BcdqbMmW4ohD7ExUq9rcGtuVn8e']
```


## 事件
### onTableAdd
监听 Table 添加事件，将返回一个取消监听函数。

```typescript
onTableAdd(callback: () => void): () => void;
```
#### 示例
```typescript
const off = bitable.base.onTableAdd((event) => {
  console.log('table added')
})
```

### onTableDelete
监听 Table 删除事件，将返回一个取消监听函数。
```typescript
onTableDelete(callback: () => void): () => void;
```
#### 示例
```typescript
const off = bitable.base.onTableDelete((event) => {
  console.log('table deleted')
})
```

### onSelectionChange
监听当前选中（数据表、单元格、视图）改变事件，将返回一个取消监听函数。
```typescript
onSelectionChange(callback: () => void): () => void;
```

#### 示例
```typescript
const off = bitable.base.onSelectionChange((event: { data: Selection }) => {
  console.log('current selection', event)
})
```