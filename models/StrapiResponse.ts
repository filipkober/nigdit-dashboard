type StrapiResponse<T> = {
    data: T,
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number,
        }
    }
}

interface GenericStrapiData {
    id: number,
    attributes: any
}

const strapiResponseToData = <T>(strapiResponse: StrapiResponse<T>) => {
    return strapiResponse.data
}

const strapiDataTypeToData = <T>(strapiDataType: GenericStrapiData) => {
    return {
        id: strapiDataType.id,
        ...strapiDataType.attributes
    }
}

export default StrapiResponse
export { strapiResponseToData }
