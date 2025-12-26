export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    due_date: Date;
    created_at: Date;
    done: boolean;
}

export interface TaskRequest {
    title: string;
    description?: string;
    status: string;
    due_date?: Date;
}