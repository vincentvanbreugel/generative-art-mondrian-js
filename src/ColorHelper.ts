import { COLORS } from './constants';
import { ColorKey } from './types';
import { randInt, shuffleArray } from './utils';

// Helping the Maestro by taking care of anything color related
export class ColorHelper {
    private colorCount = {
        white: 0,
        blue: 0,
        red: 0,
        yellow: 0,
        black: 0,
    };
    private colorRules: {[key: string]: any};
    private colorKeys = Object.keys(COLORS) as ColorKey[];
    private colorTotal = 0;

    constructor(colorRules: {[key: string]: any}) {
        console.log(colorRules);
        
        this.colorRules = colorRules;
    }

    getColors(): ColorKey[] {
        const colors: ColorKey[] = [];

        for (let i = 0; i < this.colorTotal; i++) {
            const color = this.pickColor();
            colors.push(color);
            this.updateColorCount(color);
        }

        return shuffleArray(colors);
    }

    setColorTotal(number: number): void {
        this.colorTotal = number;
    }

    private pickColor(): ColorKey {
        // First try to select a randomized color that doesn't meet the minCount requirement of the colorRules for that color
        const colorsBelowMinCount = this.colorKeys.filter((key) => {
            return this.colorCount[key] < this.colorRules[key].minCount;
        });

        if (colorsBelowMinCount.length > 0) {
            return colorsBelowMinCount[randInt(0, colorsBelowMinCount.length)];
        }

        // Else get a randomized color that doesn't exceed the maxPercentage of the colorRules for that color
        const color = this.colorKeys[randInt(0, this.colorKeys.length)]
        if (this.isColorBelowMaxPercentage(color)) {
            return color;
        } else {
            return this.pickColor();
        }
    }

    private updateColorCount(color: ColorKey): void {
        this.colorCount[color]++;
    }

    private isColorBelowMaxPercentage(color: ColorKey): boolean {
        const currentColorPercentage =
            (this.colorCount[color] / this.colorTotal) * 100 || 0;
        return currentColorPercentage < this.colorRules[color].maxPercentage;
    }
}
