export interface FormState {
    success: boolean;
    error: string | null;
    message: string;
}

export interface ButtonData {
    text: string;
    onClick?: ()=> void;
    variants?: string;
}