/**
 * 指定された値がundefinedまたはnullかをチェックし、一致した場合エラーをスローします。
 * @param value
 */
export declare function assertEmpty(value: any): void;
/**
 * 指定された値がundefinedかをチェックし、一致した場合エラーをスローします。
 * @param value
 */
export declare function assertUndefined(value: any): void;
/**
 * 指定された値がnullかをチェックし、一致した場合エラーをスローします。
 * @param value
 */
export declare function assertNull(value: any): void;
/**
 * 指定された範囲の整数の乱数を生成します。
 * @param min 最小値を指定します。
 * @param max 最大値を指定します。
 */
export declare function randomInt(min: number, max: number): number;
/**
 * 指定された範囲の小数の乱数を生成します。
 * @param min 最小値を指定します。
 * @param max 最大値を指定します。
 */
export declare function randomFloat(min: number, max: number): number;
