

interface ActionInterface{
    label: string;
    action: Function;
} 


interface ToastInterface{
    id?: string;
    color?: "primary" | "secondary" | "success" | "warning" | "danger" ;
    title?: string | JSX.Element;
    body?: string | JSX.Element;
    actions?: Array<ActionInterface>;
}

export type { ActionInterface, ToastInterface};



