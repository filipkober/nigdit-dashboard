import Media from "./Media";

type Subnigdit = {
    id?: number;
    name: string;
    description: string;
    createdAt: Date;
    reports: number;
}

type StrapiSubnigdit = {
    id: number;
    attributes: {
        name: string;
        description: string;
        createdAt: Date;
        reports: number;
        icon: Media;
    }
}

export default Subnigdit;
export type { StrapiSubnigdit };