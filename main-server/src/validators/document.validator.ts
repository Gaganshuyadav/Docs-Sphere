import { body} from 'express-validator';

class DocumentValidator{

    public updateDocument = [
        body("title")
            .optional()
            .isLength({ min:0, max:25})
            .withMessage("Title must be between 0 to 25 characters."),
        body("content")
            .optional()
            .custom(( value)=>{

                try{
                    const strf = JSON.stringify(value); //app.use(express.json()) by default parse the data without parse , if sender send JSON.stringify 
                    const dfd = JSON.parse(strf);
                }
                catch(error){
                    console.log(error);
                    throw new Error("Invalid document content.");
                }

                return true;
            }),
        body("isPublic")
            .optional()
            .isBoolean()
            .withMessage("Must provide true or false value"),
        
    ]

}

const documentValidator = new DocumentValidator();

export { documentValidator};

