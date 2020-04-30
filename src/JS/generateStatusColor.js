/**
 * value of green (for better status)
 *     ^
 * 255_|. . . . ______
 *     |     _/|
 *     |   _/  |
 *     | _/    |
 *     |/______|______
 *            0.5     1 status
 * 
 * value of red (for worse status)
 *     ^
 * 255_|. . . _
 *     |      |\_
 *     |      |  \_
 *     |      |    \_
 *     |______|______\
 *    0      0.5     1 status
 * 
 *  So in 0.5 red and green values are equal to 255 => yellow (for normal status)
 */
export default function generateStatusColor(status) {
    const green = status > 0.5
        ? 255
        : 255 * 2 * status;

    const red = status < 0.5
        ? 255
        : 255 * 2 * (1 - status);

    return `rgb(${red}, ${green}, 0)`;
}
