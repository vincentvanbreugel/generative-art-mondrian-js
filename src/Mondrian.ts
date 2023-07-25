import { Square } from './Square';
import { isCanvas, randInt } from './helpers';

// The one that paints
export class Mondrian {
    private canvas: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private width = 1500;
    private height = 900;
    private step = 150;
    private lineWidth = 8;
    private colors = [
        '#FFFEFB',
        '#FFFEFB',
        '#FFFEFB',
        '#FFFEFB',
        '#3755A1',
        '#EC4028',
        '#F7C940',
        '#222222',
    ];
    private squares: Square[] = [new Square(0, 0, this.width, this.height)];

    constructor(rootElementId: string) {
        this.canvas = document.getElementById(rootElementId) as HTMLCanvasElement;
        if (!isCanvas(this.canvas)) {
            throw new Error('Root element must by a Canvas element');
        }

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context.lineWidth = this.lineWidth;
    }

    draw(): void {
        this.splitSquares({ x: 0, y: 0 });

        this.squares.forEach((square) => {
            this.context.beginPath();
            this.context.rect(square.x, square.y, square.width, square.height);
            square.color = this.colors[randInt(0, this.colors.length)];
            this.context.fillStyle = square.color;
            this.context.fill();
            this.context.stroke();
        });
    }

    private splitSquares(coordinates: { y: number; x: number }): void {
        const { x, y } = coordinates;

        if (y >= this.height && x >= this.width) {
            return;
        }

        if (x < this.width) {
            for (var i = this.squares.length - 1; i >= 0; i--) {
                const square = this.squares[i];

                if (x > square.x && x < square.x + square.width) {
                    if (Math.random() > 0.5) {
                        this.squares.splice(i, 1);
                        this.splitOnX(square, x);
                    }
                }
            }
        }

        if (y < this.height) {
            for (var i = this.squares.length - 1; i >= 0; i--) {
                const square = this.squares[i];

                if (y > square.y && y < square.y + square.height) {
                    if (Math.random() > 0.5) {
                        this.squares.splice(i, 1);
                        this.splitOnY(square, y);
                    }
                }
            }
        }

        this.splitSquares({ y: y + this.step, x: x + this.step });
    }

    private splitOnX(square: Square, splitAt: number): void {
        this.squares.push(
            new Square(
                square.x,
                square.y,
                square.width - (square.width - splitAt + square.x),
                square.height,
            ),
        );
        this.squares.push(
            new Square(splitAt, square.y, square.width - splitAt + square.x, square.height),
        );
    }

    private splitOnY(square: Square, splitAt: number): void {
        this.squares.push(
            new Square(
                square.x,
                square.y,
                square.width,
                square.height - (square.height - splitAt + square.y),
            ),
        );
        this.squares.push(
            new Square(square.x, splitAt, square.width, square.height - splitAt + square.y),
        );
    }
}
