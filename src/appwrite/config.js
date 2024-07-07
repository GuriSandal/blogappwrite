import conf from '../conf/conf.js';
import { Client, Databases, ID, Storage, Query } from "appwrite";


export class Serive{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project_id);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            )
            return true
        }
        catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            )
        }
        catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                queries
            )
        }
        catch (error) {
            console.log("Appwrite serive :: getAllPosts :: error", error);
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucket_id,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwrite_bucket_id,
                fileId
            )
            return true 
        }
        catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwrite_bucket_id,
            fileId
        )
    }
}


const appwriteService = new Serive()
export default appwriteService
