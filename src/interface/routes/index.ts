import type { JSX } from "react";

export interface Route {
    index?: boolean;
    path: string;
    name: string;
    element: JSX.Element;
    children?: Route[];
}