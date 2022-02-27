const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors');
const generator = require('generate-password');

admin.initializeApp(functions.config().firebase);

exports.createEmployee = functions.https.onRequest(async (req, res) => {
    cors()(req, res, () => {
        const parsed = JSON.parse(req.body);

        const name = parsed.name;
        const email = parsed.email;
        const adminId = parsed.adminId;

        const db = admin.firestore();
        const employee = {
            name: name,
            email: email,
            adminId: adminId,
        }

        db.collection('employees').add(employee).then((doc) => db.collection('employees').doc(doc.id).collection('tests').add({}))
    })
});

exports.createUser = functions.https.onRequest((req, res) => {
    cors()(req, res, () => {
        const parsed = JSON.parse(req.body);

        const email = parsed.email;
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        admin.auth().createUser({
            email: email,
            password: password
        }).then((userRecord) => {
            res.send(userRecord)
        })
    })
});

exports.getUsers = functions.https.onRequest((req, res) => {
    cors()(req, res, async () => {
        const employee = await admin.firestore().collection('employees').get();
        res.send(employee.docs.map(doc => doc.data()))
    })
})

exports.getAdmins = functions.https.onRequest((req, res) => {
    cors()(req, res, async () => {
        const adminUser = await admin.auth().listUsers();
        res.send(adminUser.users.map(doc => doc.toJSON()));
    })
})

exports.planTest = functions.https.onRequest((req, res) => {
    cors()(req, res, async () => {
        const parsed = JSON.parse(req.body);
        const db = admin.firestore().collection('employees');
        const employee = await db.where('name', '==', parsed.name).get();
        employee.forEach(doc => {
            db.doc(doc.id).collection('tests').add({ date: 'pending', result: 'pending' })
        })
    })
})

exports.deleteUser = functions.https.onRequest((req, res) => {
    cors()(req, res, async () => {
        const parsed = JSON.parse(req.body);
        try {
            admin.auth().deleteUser(parsed.uid);
            res.send(true)
        } catch {
            res.send(false)
        }
    })
})
