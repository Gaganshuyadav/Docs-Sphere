

declare global{                                                                                                                         //This syntax is used to declare types or interfaces that should be available globally in your TypeScript project.
    namespace Express{                                                                                                                  //This defines a namespace called Express. Namespaces are a way to group related code together
        interface Request{                                                                                                              //This is extending the existing Request interface provided by the Express type
            user?: RequestUser;
        }
    }
}

export {};