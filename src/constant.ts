/** 每列的名称 */
export const COL_NAME = ['B', 'I', 'N', 'G', 'O']
/** 第一个数 */
export const BALL_NUM_FROM = 1
/** 每列的范围 */
export const PER_COL_RANGE = 15
/** 行数 */
export const ROW_COUNT = 5
/** 报球视图显示球数 */
export const BALL_NUM_IN_BOARD = 5

// AUTO COUNTING

/** 列数 */
export const COL_COUNT = COL_NAME.length
/** 球数 */
export const BALL_COUNT = PER_COL_RANGE * ROW_COUNT

export const BALL_NUM_TO = BALL_NUM_FROM + BALL_COUNT - 1
/** 卡片数字数 */
export const CARD_NUM_COUNT = ROW_COUNT * COL_COUNT
