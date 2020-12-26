import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as exphbs from 'express-handlebars';
import {FirestoreHelper} from './firestoreHelper';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

admin.initializeApp();
let fsh = new FirestoreHelper();

let app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.locals.copyright = new Date().getFullYear();

app.get('/', async (req, res) => {
    let coreDoc:DocumentSnapshot | null = null;

    if (req.query.feed) {
        // TODO go to feed page
    } else if (!req.query.content)
    {
        coreDoc = await fsh.getFirestorePageById("HomePage");
        // TODO handle not exists
    } else {
        coreDoc = await fsh.getFirestorePageById(req.query.content as string);
    }

    if (coreDoc) {
        let data = coreDoc.data();
        return res.render('render_page', {data});
    } else {
        console.log ("Rendering error page!");
        return res.render('error');
    }
});

exports.app = functions.https.onRequest(app);