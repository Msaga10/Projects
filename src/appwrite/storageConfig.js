import conf from "../conf/conf";
import { Client, ID, Storage, Query} from "appwrite"

export class storageService{
    client = new Client
    storage;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.storage = new Storage(this.client)
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appWrite service:: create post:: error", error);
                return false
        }
    }

    async getFiles(fileId){
        try{
            const file = await this.storage.getFile(
                conf.appwriteBucketId,
                fileId
            )
            return file
        }catch(error){
            console.log("appWrite service:: get file:: error",error)
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appWrite service:: create post:: error", error);
                return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const storage_service = new storageService()
export default storage_service