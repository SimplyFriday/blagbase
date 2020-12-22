import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as exphbs from 'express-handlebars';

admin.initializeApp();

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

async function getFirestore(){
    const firestore_con  = await admin.firestore();
    
    const writeResult = firestore_con.collection('sample').doc('sample_doc').get().then(doc => {
        if (!doc.exists) { 
            console.log('No such document!'); 
            return null;
        }
        else {
            return doc.data();
        }
    })
    .catch(err => { 
        console.log('Error getting document', err);
    });

    return writeResult
}

app.get('/', async (req, res) => {
    var db_result = await getFirestore();
    
    console.log(db_result);

    if (db_result) {
        return res.render('index', {db_result});
    } else {
        console.log ("Rendering error page!");
        return res.render('error');
    }
});

exports.app = functions.https.onRequest(app);