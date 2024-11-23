/// <reference types="node" />
export declare const readFile: (year: string, day: string) => Buffer;
export declare const readMockFile: () => Buffer;
export declare const createGrid: (gridWidth: number, gridHeight: number, fill: any) => any[][];
export declare const getGridDimensions: (grid: (number | string)[][]) => {
    gridHeight: number;
    gridWidth: number;
};
export declare const printGrid: (grid: (number | string)[][], delimiter?: string) => void;
