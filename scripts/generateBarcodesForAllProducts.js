"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var readline = require("readline");
// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}
var db = admin.firestore();
function generateBarcode() {
    // Generate CODE128 compatible barcode (alphanumeric)
    var timestamp = Date.now().toString(36).toUpperCase();
    var random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return "".concat(timestamp).concat(random);
}
function generateBarcodesForAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var usersSnapshot, totalProducts, updatedProducts, alreadyHadBarcodes, _i, _a, userDoc, userId, productsSnapshot, _b, _c, productDoc, product, barcode, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 11, , 12]);
                    console.log('Starting barcode generation for all products...\n');
                    return [4 /*yield*/, db.collection('users').get()];
                case 1:
                    usersSnapshot = _d.sent();
                    console.log("Found ".concat(usersSnapshot.size, " users\n"));
                    totalProducts = 0;
                    updatedProducts = 0;
                    alreadyHadBarcodes = 0;
                    _i = 0, _a = usersSnapshot.docs;
                    _d.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 10];
                    userDoc = _a[_i];
                    userId = userDoc.id;
                    console.log("Processing user: ".concat(userId));
                    return [4 /*yield*/, db
                            .collection('users')
                            .doc(userId)
                            .collection('products')
                            .get()];
                case 3:
                    productsSnapshot = _d.sent();
                    console.log("  Found ".concat(productsSnapshot.size, " products"));
                    totalProducts += productsSnapshot.size;
                    _b = 0, _c = productsSnapshot.docs;
                    _d.label = 4;
                case 4:
                    if (!(_b < _c.length)) return [3 /*break*/, 8];
                    productDoc = _c[_b];
                    product = productDoc.data();
                    if (!!product.barcode) return [3 /*break*/, 6];
                    barcode = generateBarcode();
                    return [4 /*yield*/, db
                            .collection('users')
                            .doc(userId)
                            .collection('products')
                            .doc(productDoc.id)
                            .update({
                            barcode: barcode,
                            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                        })];
                case 5:
                    _d.sent();
                    console.log("    \u2713 Generated barcode for: ".concat(product.name, " (").concat(product.sku, ") -> ").concat(barcode));
                    updatedProducts++;
                    return [3 /*break*/, 7];
                case 6:
                    console.log("    - Already has barcode: ".concat(product.name, " (").concat(product.barcode, ")"));
                    alreadyHadBarcodes++;
                    _d.label = 7;
                case 7:
                    _b++;
                    return [3 /*break*/, 4];
                case 8:
                    console.log('');
                    _d.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 2];
                case 10:
                    console.log('\n=== Summary ===');
                    console.log("Total products found: ".concat(totalProducts));
                    console.log("Products updated with new barcodes: ".concat(updatedProducts));
                    console.log("Products that already had barcodes: ".concat(alreadyHadBarcodes));
                    console.log('\n✅ Barcode generation complete!');
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _d.sent();
                    console.error('Error generating barcodes:', error_1);
                    throw error_1;
                case 12: return [2 /*return*/];
            }
        });
    });
}
// Confirmation prompt
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('\n⚠️  This will generate barcodes for ALL products without barcodes.\nContinue? (yes/no): ', function (answer) {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        generateBarcodesForAllProducts()
            .then(function () {
            console.log('\nDone! You can now refresh your app to see the barcodes.');
            process.exit(0);
        })
            .catch(function (error) {
            console.error('Migration failed:', error);
            process.exit(1);
        });
    }
    else {
        console.log('Migration cancelled.');
        rl.close();
        process.exit(0);
    }
});
