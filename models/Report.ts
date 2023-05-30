import Media from "./Media"
import User, { StrapiUser } from "./User"

type StrapiReport = {
    data: {
        id: number,
        attributes: {
            contentId: number,
            contents: string,
            type: "post" | "comment" | "reply",
            toSubnigdit: boolean,
            reportMessage?: string,
            reporter: StrapiUser | {data: null},
            media: Media | {data: null},
            contentOwner: StrapiUser | {data: null}
        }
    }
}

type Report = {
    id: number,
    contentId: number,
    contents: string,
    type: "post" | "comment" | "reply",
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
        media: r.data.attributes.media.data?.hasOwnProperty("id") ? r.data.attributes.media as Media : null,
        contentOwner: r.data.attributes.contentOwner.hasOwnProperty("data") ? null : r.data.attributes.contentOwner as StrapiUser
    }
}

export default Report;
export {reportAdapter}