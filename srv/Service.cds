using {donation.db as db} from '../db/Schema';


service DonationSrv @(path: 'donationsrv') {
    entity Users        as projection on db.User;
    entity Transactions as projection on db.Transaction;

    type DonationReceipt {
        userID        : String;
        receiptNumber : String;
        pdfContent    : LargeBinary;
    }

    function generateDonationReceipt(userID: UUID, TransactionId: UUID) returns DonationReceipt;

}
