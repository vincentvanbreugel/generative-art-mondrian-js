import { COLORS } from "./constants";

export type ColorKey = keyof typeof COLORS;

export type ColorRule = {
    minCount: number;
    maxPercentage: number;
};

export type ColorRules = {
    [key in  ColorKey] : ColorRule;
};

export type Config = {
    size: number;
    columns: number;
    lineWidth: number;
    colors: ColorRules;
};
