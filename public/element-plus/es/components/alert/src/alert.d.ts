import type { ExtractPropTypes } from 'vue';
export declare const alertEffects: readonly ["light", "dark"];
export declare const alertProps: {
    readonly title: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly description: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "error" | "primary" | "success" | "warning" | "info", unknown, "info", boolean>;
    readonly closable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly closeText: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly showIcon: BooleanConstructor;
    readonly center: BooleanConstructor;
    readonly effect: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dark" | "light", unknown, "light", boolean>;
};
export type AlertProps = ExtractPropTypes<typeof alertProps>;
export declare const alertEmits: {
    close: (evt: MouseEvent) => boolean;
};
export type AlertEmits = typeof alertEmits;
