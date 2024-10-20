import { Data } from "./data";

export interface Book {
    status:  string;
    message: string;
    data:    Data[];
}
