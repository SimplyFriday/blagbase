import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as admin from 'firebase-admin';

export class FirestoreHelper {
    async getFirestorePageById(pageId:string): Promise<void | DocumentSnapshot | null> {
        const firestore_con  = await admin.firestore();
        
        const writeResult = firestore_con.collection('Content').doc(pageId).get().then(doc => {
            if (!doc.exists) { 
                console.log('No such document!'); 
                return null;
            }
            else {
                return doc;
            }
        })
        .catch(err => { 
            console.log('Error getting document', err);
        });
    
        return writeResult
    }
}