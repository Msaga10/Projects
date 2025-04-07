import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query} from "appwrite"
import CryptoJS from "crypto-js";


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


    //////////////////// Token //////////////////////
    async upsertFCMToken(userId, sessionId, token) {
        console.log("token data:",token);
        
        try {
            // const existingTokens = await this.getUserTokens(userId);
            // const tokenObject = existingTokens ? JSON.parse(existingTokens) : {}
            // tokenObject[sessionId] = token
            // const tokensString = JSON.stringify(tokenObject)

            // if (existingTokens) {
            //     // console.log(conf.appwriteDatabaseId);
            //     // console.log(conf.appwriteCollectionIdofTokens);
                
            //     // // Update the token for the specific session
            //     // existingTokens[sessionId] = token;
            //     return await this.databases.updateDocument(
            //         conf.appwriteDatabaseId,
            //         conf.appwriteCollectionIdofTokens,
            //         userId,
            //         { token: tokensString, userId: userId, sessionId: sessionId }
            //     );
            // } else {
            //     // Create a new document with the token
            //     return await this.databases.createDocument(
            //         conf.appwriteDatabaseId,
            //         conf.appwriteCollectionIdofTokens,
            //         userId,
            //         { token: tokensString , userId: userId, sessionId: sessionId }
            //     );
            // }


function generateDocumentId(userId, sessionId) {
    const combined = `${userId}-${sessionId}`;

    const hash = CryptoJS.SHA256(combined).toString(CryptoJS.enc.Hex);

    return hash.substring(0, 36);  
}
            const documentId = generateDocumentId(userId,sessionId)
            console.log(documentId);
            
        
            try {
                // Check if document exists
                await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdofTokens,
                    documentId
                );
                
                // Update existing document
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdofTokens,
                    documentId,
                    { 
                        userId: userId,
                        sessionId: sessionId,
                        token: token  // Store just one token per document
                    }
                );
            } catch (error) {
                // Create new document
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdofTokens,
                    documentId,
                    { 
                        userId: userId,
                        sessionId: sessionId,
                        token: token  // Store just one token per document
                    }
                );
            }
        } catch (error) {
            console.error("appWrite service:: upsert FCM token:: error", error);
        }
    }

    async getUserTokens(userId) {
        try {
            // const document = await this.databases.getDocument(
            //     conf.appwriteDatabaseId,
            //     conf.appwriteCollectionIdofTokens,
            //     userId
            // );
            // return document?.token || null;

            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofTokens,
                [
                    Query.equal('userId', userId)
                ]
            );
            
            const result = {};
            for (const doc of response.documents) {
                result[doc.sessionId] = doc.token;
            }
            return Object.keys(result).length > 0 ? result : null;
        } catch (error) {
            console.error("appWrite service:: get user tokens:: error", error);
            return null;
        }
    }

    async deleteFCMToken(userId, sessionId) {
        try {
            // const existingTokens = await this.getUserTokens(userId);
            // if (existingTokens && existingTokens[sessionId]) {
            //     delete existingTokens[sessionId];
            //     return await this.databases.updateDocument(
            //         conf.appwriteDatabaseId,
            //         conf.appwriteCollectionIdofTokens,
            //         userId,
            //         { token: existingTokens }
            //     );
            // }

            const documentId = `${userId}-${sessionId}`;
        
            // Delete the specific document for this session
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdofTokens,
                documentId
            );
        } catch (error) {
            console.error("appWrite service:: delete FCM token:: error", error);
        }
    }
}

const db_service = new dbService()
export default db_service