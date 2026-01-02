import { classes } from './classes';
import { modules } from './modules';

export interface course {
    id: string;
    courseCreator_id: string;
    name: string;
    description: string;
    hours: number;
    classes: classes[];
    modules: modules[];
    bannerImage: string;
    createdAt: Date;
    updatedAt: Date;
}
