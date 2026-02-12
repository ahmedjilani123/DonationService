using {donation as db} from '../db/Schema';


service DonationSrv @(path: 'DonationSrv') {
    entity Users        as projection on db.User;
    entity Transactions as projection on db.Transaction;

    type DonationReceipt {
        userID        : String;
        receiptNumber : String;
        pdfContent    : LargeBinary;
    }
    action UserLogin(email: String, password: String) returns array of Users;
    action generateDonationReceipt(userID: UUID, TransactionId: UUID) returns DonationReceipt;

}
