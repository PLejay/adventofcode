/// <reference types="node" />
export declare const readFile: (year: string, day: string) => Buffer;
export declare const readMockFile: () => Buffer;
export declare const createGrid: <T extends string | number>(gridWidth: number, gridHeight: number, fill: T) => T[][];
export declare const getGridDimensions: (grid: (number | string)[][]) => {
    gridHeight: number;
    gridWidth: number;
};
export declare const printGrid: (grid: (number | string)[][], delimiter?: string) => void;
