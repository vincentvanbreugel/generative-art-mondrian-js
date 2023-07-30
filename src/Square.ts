import { Point } from "./Point";

export class Square {
    point: Point;
    width: number;
    height: number;

    constructor(point: Point, width: number, height: number) {
        this.point = point;
        this.width = width;
        this.height = height;
    }
}
