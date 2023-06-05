export type ContentType = "post" | "comment" | "reply"

export const contentTypeToPlural = (c: ContentType): string => {
    switch(c) {
        case "post":
            return "posts";
        case "comment":
            return "comments";
        case "reply":
            return "replies";
    }
}