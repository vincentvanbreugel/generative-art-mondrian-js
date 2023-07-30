import { Square } from './Square';
import { Point } from './Point';
import { ColorHelper } from './ColorHelper';
import { isCanvas } from './utils';
import { COLORS, DEFAULT_CONFIG } from './constants';
import { ColorKey, Config } from './types';

// The Maestro himself, the one that is responsible for creating and drawing the canvas
export class Mondrian {
    private canvas: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private squares: Square[] = [];
    private splitIntervals: number[] = [];
    private minRequiredSquares = 0;
    private config: Config;
    private colorHelper: ColorHelper;

    constructor(rootElementId: string, config?: { [key: string]: any }) {
        this.canvas = document.getElementById(rootElementId) as HTMLCanvasElement;
        if (!isCanvas(this.canvas)) {
            throw new Error('Root element must by a Canvas element');
        }

        this.config = {
            ...DEFAULT_CONFIG,
            ...config,
        };
        this.canvas.width = this.config.size;
        this.canvas.height = this.config.size;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.context.lineWidth = this.config.lineWidth;
        this.splitIntervals = this.getSplitIntervals(this.config.size, this.config.columns);
        // TODO: move to method
        this.minRequiredSquares = 7;
        this.colorHelper = new ColorHelper(this.config.colors);
    }

    draw(): void {
        this.squares = this.createSquares();
        this.colorHelper.setColorTotal(this.squares.length);
        const colors = this.colorHelper.getColors();
        this.squares.forEach((square, index) => {
            this.drawSquare(square, colors[index]);
        });
        // TODO: remove outer black border
    }

    private createSquares(): Square[] {
        const initialSquare = new Square(new Point(0, 0), this.config.size, this.config.size);
        let squares = this.splitSquares(0, [initialSquare]);
        while (squares.length < this.minRequiredSquares) {
            squares = this.splitSquares(0, [initialSquare]);
        }

        return squares;
    }

    private drawSquare(square: Square, color: ColorKey): void {
        this.context.beginPath();
        this.context.rect(square.point.x, square.point.y, square.width, square.height);
        this.context.fillStyle = COLORS[color];
        this.context.fill();
        // TODO: update stroke color
        this.context.stroke();
    }

    private splitSquares(splitIndex: number, squares: Square[]): Square[] {
        if (splitIndex >= this.splitIntervals.length) {
            return squares;
        }

        const interval = this.splitIntervals[splitIndex];

        for (let i = squares.length - 1; i >= 0; i--) {
            const square = squares[i];

            if (interval > square.point.x && interval < square.point.x + square.width) {
                // TODO: limit randomness by tracking amount of splits
                if (Math.random() > 0.6) {
                    const splitSquares = this.split(square, interval, 'x');
                    squares[i] = splitSquares[0];
                    squares.push(splitSquares[1]);
                }
            }
        }

        for (let i = squares.length - 1; i >= 0; i--) {
            const square = squares[i];

            if (interval > square.point.y && interval < square.point.y + square.height) {
                if (Math.random() > 0.6) {
                    const splitSquares = this.split(square, interval, 'y');
                    squares[i] = splitSquares[0];
                    squares.push(splitSquares[1]);
                }
            }
        }

        splitIndex = splitIndex + 1;

        return this.splitSquares(splitIndex, squares);
    }

    private split(square: Square, splitAt: number, direction: 'y' | 'x'): Square[] {
        if (direction === 'x') {
            return [
                new Square(
                    new Point(splitAt, square.point.y),
                    square.width - splitAt + square.point.x,
                    square.height,
                ),
                new Square(
                    new Point(square.point.x, square.point.y),
                    square.width - (square.width - splitAt + square.point.x),
                    square.height,
                ),
            ];
        } else if (direction === 'y') {
            return [
                new Square(
                    new Point(square.point.x, square.point.y),
                    square.width,
                    square.height - (square.height - splitAt + square.point.y),
                ),
                new Square(
                    new Point(square.point.x, splitAt),
                    square.width,
                    square.height - splitAt + square.point.y,
                ),
            ];
        }

        return [];
    }

    private getSplitIntervals(size: number, columns: number): number[] {
      const fixedInterval = size / columns;
      let interval = fixedInterval;
      const splits = [];

      while (interval < size) {
          splits.push(interval);
          interval = interval + fixedInterval;
      }

      return splits;
  }
}
