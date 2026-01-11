import { certificates } from './cetificates';
import { modules } from './modules';

export interface course {
    id: string;
    courseCreator_id: string;
    name: string;
    description: string;
    hours: number;
    modules: modules;
    bannerImage: string;
    createdAt: Date;
    updatedAt: Date;
    certificate: certificates;
}
