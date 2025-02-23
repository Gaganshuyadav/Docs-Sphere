import { Op } from "sequelize";
import { Document } from "../models/document.model.js";
import { DocumentUser } from "../models/document-user.model.js";
import { User } from "../models/user.model.js";



class DocumentService{

    public findDocumentById = async ( docId:number, userId:string) =>{

        //find document with user id ( Document Model)

        
        let findDoc = await Document.scope("withUsers").findOne({
            
            where:{
                [Op.or]:[
                    { 
                        id: docId,
                        userId: userId
                    },
                    { 
                        id: docId,
                        isPublic: true,
                    }
                ]
            }
        })


        //if document is not find in Document Model for user Id then , check shared document in Document User  ( DocumentUser Model)
        if(!findDoc){

            const sharedDocument:(DocumentUser | null) = await DocumentUser.findOne({
                where:{
                    documentId: docId,
                    userId
                },
                include:{
                    model: Document,
                    include:[
                        {
                            model: DocumentUser,
                            include:[
                                {
                                    model: User,
                                    attributes: ["email"]
                                }
                            ]
                        }
                    ]
                }
            });


            if(!sharedDocument){
               return null; 
            }

            findDoc = sharedDocument.document as Document ;
        }

        return findDoc;
          

    }

    public findAllDocuments = async ( userId:number) => {
        
        //find all docs by user id ( Document Model) 
        let findAllDocs = await Document.scope("withUsers").findAll({
            where:{
                userId,
            }
        });



        //find all docs by user id ( DocumentUser Model)
        const sharedDocuments = await DocumentUser.findAll({
            where:{
                userId
            },
            include:{
                model: Document,
                include:[
                    {
                        model: DocumentUser,
                        include:[
                            {
                                model: User,
                                attributes: ["email"]
                            }
                        ]
                    }
                ]
            }
        })
        

            //convert documentModel array of sharedDocuments to Document array
            const mapSharedDocuments = sharedDocuments.map((sharedDocument)=>{
                return sharedDocument.document as Document;
            })

        
    

        //combine Document and SharedDocuments
        findAllDocs = [ ...findAllDocs, ...mapSharedDocuments];


        return findAllDocs;


    }

    public searchAllDocuments = async ( userId:string, search:string)=>{

        //find all document by user Id ( Document Model)

        const findAllInDocumentModel = await Document.findAll({ 
            where: { 
                [Op.and]:[ { userId: userId} ],
                [Op.or]:[
                    { 
                        title: { [Op.like]: `${search}%` } 
                    }, 
                    { 
                        title: { [Op.like]: `%${search}%` }
                    }  
                ]
            }
        })

        //find all docs in shared documents( Document User Model)

        const findAllInSharedDocumentsModel = await DocumentUser.findAll({
            where: { [Op.and]:[{ userId: userId}] },
            include:{
                model: Document,
                where:{
                    [Op.or]:[
                        { 
                            title: { [Op.like]: `${search}%` } 
                        }, 
                        { 
                            title: { [Op.like]: `%${search}%` }
                        }
                    ]
                },
            }
        })

        const convertSharedDocumentsInDocumentFormat = findAllInSharedDocumentsModel.length < 1 ? [] : findAllInSharedDocumentsModel.map((sharedDocument)=>{
            return sharedDocument.document;
        })

        const allDocs = [ ...findAllInDocumentModel, ...convertSharedDocumentsInDocumentFormat ];

        return allDocs;

    }

}

const documentService = new DocumentService();

export { documentService};
