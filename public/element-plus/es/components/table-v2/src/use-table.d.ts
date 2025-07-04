import type { TableV2Props } from './table';
import type { TableGridInstance } from './table-grid';
declare function useTable(props: TableV2Props): {
    columns: import("vue").ComputedRef<{
        key: import("./types").KeyType;
        align?: import("./types").Alignment;
        class?: string | import("./types").ClassNameGetter<any> | undefined;
        dataKey?: import("./types").KeyType;
        fixed?: true | import("./types").FixedDirection;
        flexGrow?: import("vue").CSSProperties["flexGrow"];
        flexShrink?: import("vue").CSSProperties["flexShrink"];
        title?: string;
        hidden?: boolean;
        headerClass?: string | import("./types").HeaderClassGetter<any> | undefined;
        maxWidth?: number;
        minWidth?: number;
        style?: import("vue").CSSProperties;
        sortable?: boolean;
        width: number;
        cellRenderer?: import("./types").CellRenderer<any> | undefined;
        headerCellRenderer?: import("./types").HeaderCellRenderer<any> | undefined;
    }[]>;
    containerRef: import("vue").Ref<any>;
    mainTableRef: import("vue").Ref<TableGridInstance | undefined>;
    leftTableRef: import("vue").Ref<TableGridInstance | undefined>;
    rightTableRef: import("vue").Ref<TableGridInstance | undefined>;
    isDynamic: import("vue").ComputedRef<boolean>;
    isResetting: import("vue").ShallowRef<boolean>;
    isScrolling: import("vue").ShallowRef<boolean>;
    hasFixedColumns: import("vue").ComputedRef<number>;
    columnsStyles: import("vue").ComputedRef<Record<import("./types").KeyType, import("vue").CSSProperties>>;
    columnsTotalWidth: import("vue").ComputedRef<number>;
    data: import("vue").ComputedRef<any[]>;
    expandedRowKeys: import("vue").Ref<import("./types").KeyType[]>;
    depthMap: import("vue").Ref<Record<import("./types").KeyType, number>>;
    fixedColumnsOnLeft: import("vue").ComputedRef<{
        key: import("./types").KeyType;
        align?: import("./types").Alignment;
        class?: string | import("./types").ClassNameGetter<any> | undefined;
        dataKey?: import("./types").KeyType;
        fixed?: true | import("./types").FixedDirection;
        flexGrow?: import("vue").CSSProperties["flexGrow"];
        flexShrink?: import("vue").CSSProperties["flexShrink"];
        title?: string;
        hidden?: boolean;
        headerClass?: string | import("./types").HeaderClassGetter<any> | undefined;
        maxWidth?: number;
        minWidth?: number;
        style?: import("vue").CSSProperties;
        sortable?: boolean;
        width: number;
        cellRenderer?: import("./types").CellRenderer<any> | undefined;
        headerCellRenderer?: import("./types").HeaderCellRenderer<any> | undefined;
    }[]>;
    fixedColumnsOnRight: import("vue").ComputedRef<{
        key: import("./types").KeyType;
        align?: import("./types").Alignment;
        class?: string | import("./types").ClassNameGetter<any> | undefined;
        dataKey?: import("./types").KeyType;
        fixed?: true | import("./types").FixedDirection;
        flexGrow?: import("vue").CSSProperties["flexGrow"];
        flexShrink?: import("vue").CSSProperties["flexShrink"];
        title?: string;
        hidden?: boolean;
        headerClass?: string | import("./types").HeaderClassGetter<any> | undefined;
        maxWidth?: number;
        minWidth?: number;
        style?: import("vue").CSSProperties;
        sortable?: boolean;
        width: number;
        cellRenderer?: import("./types").CellRenderer<any> | undefined;
        headerCellRenderer?: import("./types").HeaderCellRenderer<any> | undefined;
    }[]>;
    mainColumns: import("vue").ComputedRef<import("./types").AnyColumns>;
    bodyWidth: import("vue").ComputedRef<number>;
    emptyStyle: import("vue").ComputedRef<import("vue").CSSProperties>;
    rootStyle: import("vue").ComputedRef<import("vue").CSSProperties>;
    footerHeight: import("vue").ComputedRef<import("vue").CSSProperties>;
    mainTableHeight: import("vue").ComputedRef<number>;
    fixedTableHeight: import("vue").ComputedRef<number>;
    leftTableWidth: import("vue").ComputedRef<number>;
    rightTableWidth: import("vue").ComputedRef<number>;
    showEmpty: import("vue").ComputedRef<boolean>;
    getRowHeight: (rowIndex: number) => number;
    onColumnSorted: (e: MouseEvent) => void;
    onRowHovered: ({ hovered, rowKey }: import("element-plus").RowHoverParams) => void;
    onRowExpanded: ({ expanded, rowData, rowIndex, rowKey, }: import("element-plus").RowExpandParams) => void;
    onRowsRendered: (params: import("./grid").onRowRenderedParams) => void;
    onRowHeightChange: ({ rowKey, height, rowIndex }: import("element-plus").RowHeightChangedParams, fixedDir: import("./types").FixedDirection) => void;
    scrollTo: (params: import("./composables").ScrollPos) => void;
    scrollToLeft: (scrollLeft: number) => void;
    scrollToTop: (scrollTop: number) => void;
    scrollToRow: (row: number, strategy?: import("./composables").ScrollStrategy) => void;
    onScroll: (params: import("./composables").ScrollPos) => void;
    onVerticalScroll: ({ scrollTop }: import("./composables").ScrollPos) => void;
};
export { useTable };
export type UseTableReturn = ReturnType<typeof useTable>;
