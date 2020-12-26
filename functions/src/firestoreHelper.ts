import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as admin from 'firebase-admin';

export class FirestoreHelper {
    async getFirestorePageById(pageId:string): Promise<DocumentSnapshot | null> {
        let firestore_con  = admin.firestore();
        let doc = await firestore_con.collection('Content').doc(pageId).get();

        if (!doc.exists) { 
            console.log('Document' + pageId + ' not found!'); 
            return null;
        }
        else {
            console.log('Found page: ' + doc.id);
            return doc;
        }
    }

    async getFirestorePosts(limit?:number, sortDesc:boolean = true): Promise<QueryDocumentSnapshot[] | null> {
        let firestore_con  = admin.firestore();
        let collection = firestore_con.collection('Content');
        
        let result = await collection.where('IsPost','==','true').get();
        
        if (result.empty) { 
            console.log('No posts!');
        }
            
        return result.docs;
    }
}