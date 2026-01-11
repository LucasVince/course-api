import { certificates } from './cetificates';
import { module } from './module';

export interface course {
    id: string;
    courseCreator_id: string;
    name: string;
    description: string;
    hours: number;
    modules: module[];
    bannerImage: string;
    createdAt: Date;
    updatedAt: Date;
    certificate: certificates;
}
