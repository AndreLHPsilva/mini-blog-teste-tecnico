import { IReturnApi } from "../../helpers/returnAPI";
import { IUser } from "../../models/User";


declare global {
    namespace Express {

        export interface Request {
            auth_user?: IUser;
        }

        interface Response {
            returnApi(data?: IReturnApi): Response;
        }
    }

}

