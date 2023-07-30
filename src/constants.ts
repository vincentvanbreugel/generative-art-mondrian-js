import type { Config } from "./types";

export const COLORS = {
    white: '#FFFEFB',
    blue: '#3755A1',
    red: '#EC4028',
    yellow: '#F7C940',
    black: '#222222',
} as const;

export const DEFAULT_CONFIG: Config = {
    size: 600,
    columns: 6,
    lineWidth: 12,
    colors: {
        white: {
            minCount: 3,
            maxPercentage: 100,
        },
        blue: {
            minCount: 1,
            maxPercentage: 20,
        },
        red: {
            minCount: 1,
            maxPercentage: 20,
        },
        yellow: {
            minCount: 1,
            maxPercentage: 20,
        },
        black: {
            minCount: 1,
            maxPercentage: 10,
        },
    },
};
