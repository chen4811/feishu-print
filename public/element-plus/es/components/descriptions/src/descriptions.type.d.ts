import type { ColumnAlignment, ComponentSize } from 'element-plus/es/constants';
export interface IDescriptionsInject {
    border: boolean;
    column: number;
    direction: 'horizontal' | 'vertical';
    size: ComponentSize;
    title: string;
    extra: string;
    labelWidth: string | number;
}
export interface IDescriptionsItemInject {
    label: string;
    span: number;
    rowspan: number;
    width: string | number;
    minWidth: string | number;
    labelWidth: string | number;
    align: ColumnAlignment;
    labelAlign?: ColumnAlignment;
    className: string;
    labelClassName: string;
}
