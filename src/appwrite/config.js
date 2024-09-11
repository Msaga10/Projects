import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query} from "appwrite"


export class Service{
    Client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.Client)
        this.storage = new Storage(this.Client)
    }

    async createBid({name,slug, discription, catagory, basePrice, duration}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    name,
                    discription, 
                    catagory, 
                    basePrice, 
                    duration
                }
            )
        } catch (error) {
            console.log("appWrite service:: create post:: error", error);
            
        }
    }

    async updateBid(slug,{name, discription, catagory, basePrice, duration}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    name, 
                    discription, 
                    catagory, 
                    basePrice, 
                    duration
                }
            )
        } catch (error) {
            console.log("appWrite service:: create post:: error", error);
            
        }
    }

    async deleteBid(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("appWrite service:: create post:: error", error);
            return false
        }
    }

    // async getBid(slug){}

        async getBids(queries=[Query.equal("status","active")]){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,

                )
            } catch (error) {
                console.log("appWrite service:: create post:: error", error);
                return false
            }
        }


    // file upload service
    
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

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
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

const service = new Service()
export default service