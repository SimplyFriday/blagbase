import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as exphbs from 'express-handlebars';
import {FirestoreHelper} from './firestoreHelper';

admin.initializeApp();
var fsh = new FirestoreHelper();

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    var db_result = await fsh.getFirestorePageById("home");
    console.log(req.query);

    if (db_result) {
        return res.render('index', {db_result});
    } else {
        console.log ("Rendering error page!");
        return res.render('error');
    }
});

exports.app = functions.https.onRequest(app);