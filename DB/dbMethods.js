// ===================== FIND DOCUMENTS =====================

export const findDocument = async (model, query) => {
    if (!model || !query) {
        return {
            status: 400,
            message: "Model and query are required",
            success: false
        };
    }
    const isDocumentExists = await model.findOne(query);
    if (!isDocumentExists) {
        return {
            status: 404,
            message: "Document not found",
            success: false
        };
    }
    return {
        status: 200,
        message: "Document found",
        success: true,
        data: isDocumentExists
    }
}

// ===================== ADD DOCUMENT =====================

export const addDocument = async (model, data)=>{
    if (!model || !data) {
        return {
            status: 400,
            message: "Model and data are required",
            success: false
        };
    }
    const newDocument = await model.create(data);
    if(!newDocument){
        return {
            status: 400,
            message: "Something went wrong",
            success: false
        };
    }
    return {
        status: 200,
        message: "Document added successfully",
        success: true,
        data: newDocument
    }
}