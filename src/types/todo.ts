export interface Todo {
    id?: number,
    text: string,
    isComplete: boolean,
    isShow?: boolean,
    date?: string | null;
}

export interface TodoList {
    count: number;
    listing: Todo[];
}
