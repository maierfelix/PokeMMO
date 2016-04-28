import {
  DIMENSION
} from "../../../cfg";

/**
 * Follow a entity
 * @param {Number}  x
 * @param {Number}  y
 * @param {Boolean} obstacle
 */
export function follow(x, y, obstacle) {

  let leader = this.leader;

  if (obstacle === false) {
    if (
      leader.x << 0 === this.followTarget.x << 0 &&
      leader.y << 0 === this.followTarget.y << 0
    ) {
      leader.walkTo(
        x << 0,
        y << 0
      );
      this.followTarget.x = x << 0;
      this.followTarget.y = y << 0;
    /** Target has moved to new position */
    }
  }

}