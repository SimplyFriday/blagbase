import * as express from 'express';
import * as consolidate from 'consolidate';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// Adapted from https://towardsdatascience.com/host-a-dynamic-website-on-google-firebase-for-free-using-node-js-and-cloud-firestore-db-88e98239e1b9
const app = express();
app.engine('hbs',consolidate.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://firebase-adminsdk-km3kq@greenlaw-software.iam.gserviceaccount.com"
});

async function getFirestore() {
    const firestore_con  = await admin.firestore();
    const writeResult = firestore_con.collection('Content').doc('HomePage').get().then(doc => {
        if (!doc.exists) { 
            console.log('No such document!');
            return "Not Found";
        }
        else {
            return doc.data();
        }
    })
    .catch(err => { console.log('Error getting document', err);});
    return writeResult
}

app.get('/',async (request,response) => {
    var db_result = await getFirestore();
    response.render('index',{db_result});
});

exports.app = functions.https.onRequest(app);
