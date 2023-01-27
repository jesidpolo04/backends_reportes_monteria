export class Random {
    static int(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static real(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}