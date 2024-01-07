import { ContentType } from "./ContentType"
import Media from "./Media"
import User, { StrapiUser } from "./User"

type StrapiReport = {
    data: {
        id: number,
        attributes: {
            contentId: number,
            contents: string,
            type: ContentType,
            toSubnigdit: boolean,
            reportMessage?: string,
            reporter: StrapiUser | {data: null},
            media: Media | {data: null},
            contentOwner: User | {data: null}
        }
    }
}

type Report = {
    id: number,
    contentId: number,
    contents: string,
    type: ContentType,
    toSubnigdit: boolean,
    reportMessage: string,
    reporter: StrapiUser | null,
    media: Media | null,
    contentOwner: User | null;
}

const reportAdapter = (r: StrapiReport): Report => {
    return {
        id: r.data.id,
        contentId: r.data.attributes.contentId,
        contents: r.data.attributes.contents,
        type: r.data.attributes.type,
        toSubnigdit: r.data.attributes.toSubnigdit,
        reportMessage: r.data.attributes.reportMessage || "",
        reporter: r.data.attributes.reporter.hasOwnProperty("data") ? null : r.data.attributes.reporter as StrapiUser,
        media: r.data.attributes.media?.hasOwnProperty("id") ? r.data.attributes.media as Media : null,
        contentOwner: r.data.attributes.contentOwner.hasOwnProperty("data") ? null : r.data.attributes.contentOwner as User
    }
}

export default Report;
export {reportAdapter}