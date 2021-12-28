export declare const readFile: (year: string, day: string) => Buffer;
export declare const getGridDimensions: (grid: (number | string)[][]) => {
    gridHeight: number;
    gridWidth: number;
};
export declare const printGrid: (grid: (number | string)[][]) => void;
