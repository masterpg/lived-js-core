export declare namespace utils {
    /**
     * 指定された値がundefinedまたはnullかをチェックし、一致した場合エラーをスローします。
     * @param value
     */
    function assertEmpty(value: any): void;
    /**
     * 指定された値がundefinedかをチェックし、一致した場合エラーをスローします。
     * @param value
     */
    function assertUndefined(value: any): void;
    /**
     * 指定された値がnullかをチェックし、一致した場合エラーをスローします。
     * @param value
     */
    function assertNull(value: any): void;
    /**
     * 指定された範囲の整数の乱数を生成します。
     * @param min 最小値を指定します。
     * @param max 最大値を指定します。
     */
    function randomInt(min: number, max: number): number;
    /**
     * 指定された範囲の小数の乱数を生成します。
     * @param min 最小値を指定します。
     * @param max 最大値を指定します。
     */
    function randomFloat(min: number, max: number): number;
}
export default utils;
