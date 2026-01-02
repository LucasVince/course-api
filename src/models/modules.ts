import { classes } from './classes';

export interface modules {
    id: string;
    course_id: string;
    title: string;
    description: string;
    classes: classes[];
    createdAt: Date;
    updatedAt: Date;
}
