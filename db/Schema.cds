namespace donation.db;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity User : cuid, managed {
    name           : String;
    email          : String;
    password       : String;
    role           : String;
    address        : String;
    phone          : String;
    gender         : String;
    dateOfBirth    : Date;
    firstName      : String;
    lastName       : String;
    middleName     : String;
    profilePicture : String;
    history        : Association to many Transaction on history.user = $self;


}

entity Transaction : cuid, managed {
    amount        : Decimal(10, 2);
    date          : Date;
    type          : String;
    status        : String;
    user          : Association to User;
    address       : String;
    panNo         : String;
    aadharNo      : String;
    TransactionId : String;
    receiptNumber : String;
    pinCode       : String;
    totalAmount   : Decimal(10, 2);

}

