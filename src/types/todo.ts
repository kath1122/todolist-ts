export interface Todo {
    id?: number,
    text: string,
    isComplete: boolean,
    isShow?: boolean,
    date?: Date | null;
}
