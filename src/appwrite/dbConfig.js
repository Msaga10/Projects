import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query} from "appwrite"


export class dbService{
    client = new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
    }

    async createLot({item_name,item_type, category, description, purchased_date, old, base_amount, start_date, end_date, userId, status, imageUrls}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofLots,
                ID.unique(),
                {
                    item_name,
                    item_type,
                    category, 
                    description,
                    purchased_date,
                    old, 
                    base_amount, 
                    start_date, 
                    end_date,
                    userId,
                    status,
                    imageUrls
                }
            )
        } catch (error) {
            console.log("appWrite service:: create lot:: error", error);
        }
    }

    async updateLot({name, description, category, basePrice, duration}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofLots,
                {
                    name, 
                    description, 
                    category, 
                    basePrice, 
                    duration
                }
            )
        } catch (error) {
            console.log("appWrite service:: create lot:: error", error);
            
        }
    }

    async deleteLot(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofLots,
            )
            return true
        } catch (error) {
            console.log("appWrite service:: delete lot:: error", error);
            return false
        }
    }

    async getLot(userId){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofLots,
                userId
            )
        }catch(error){
            console.error("appWrite service:: get lot:: error",error);
            return null
            
        }
    }

    async getLots(attribute, userId){
        const queries = [Query.equal(attribute, userId)];
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofLots,
                queries,
            )
        } catch (error) {
            console.log("appWrite service:: get lots:: error", error);
            return false
        }
    }

    
    ///////////////////// For Bid ////////////////////////

    async createBid({lot_id, user_id, bid_amount, bid_time, status, previous_bid_id}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofBids,
                ID.unique(),
                {
                    lot_id, 
                    user_id, 
                    bid_amount, 
                    bid_time, 
                    status, 
                    previous_bid_id
                }
            )
        } catch (error) {
            console.log("appWrite service:: create bid:: error", error);
            
        }
    }

    async getBid(userId){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofBids,
                userId
            )
        }catch(error){
            console.error("appWrite service:: get bid:: error",error);
            return null
            
        }
    }

    async getBids(attribute, LotId){
        const queries = [Query.equal(attribute, LotId)];
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofBids,
                queries,
            )
        } catch (error) {
            console.log("appWrite service:: get bids:: error", error);
            return false
        }
    }


    ///////////////// User Details ////////////////////

    async userDetails(user_id,name,email,password_hash,status){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofUsers,
                ID.unique(),
                {
                    user_id,
                    name,
                    email,
                    password_hash,
                    status
                }
            )
        } catch (error){
            console.log('appwrite :: userDetails :: error ::', error)
        }
    }

    async getUserDetails(attribute,user_id){
        const queries = [Query.equal(attribute,user_id)]
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofUsers,
                queries
            )
        } catch(error){
            console.log("appWrite service:: get users:: error", error);
            return false
        }
    }

}

const db_service = new dbService()
export default db_service