import { lesson } from './lesson';

export interface module {
    id: string;
    title: string;
    description: string;
    lessons: lesson[];
    createdAt: Date;
    updatedAt: Date;
}
