'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var configuration = require('./Data/Configuration');

/**
 * This is a sample code to call TMS PaymentInstrumentApi,
 * paymentinstrumentsPost method will create a new PaymentInstruments
 */

function createPaymentInstrument(nome, month, year, number, callback) {
    try {
        var configObject = new configuration();
        var instance = new cybersourceRestApi.PaymentInstrumentsApi(configObject);

        var card = new cybersourceRestApi.Tmsv1paymentinstrumentsCard();
        card.expirationMonth = month;
        card.expirationYear = year;
        card.type = 'visa';

        var billTo = new cybersourceRestApi.Tmsv1paymentinstrumentsBillTo();
        billTo.firstName = 'John';
        billTo.lastName = 'Deo';
        billTo.company = nome;
        billTo.address1 = 'www';
        billTo.address2 = 'www';
        billTo.locality = 'www';
        billTo.administrativeArea = 'ww';
        billTo.postalCode = '22';
        billTo.country = 'BR';
        billTo.email = 'c@g.com';
        billTo.phoneNumber = '22222222';

        var instrumentIdentifierCard = new cybersourceRestApi.Tmsv1instrumentidentifiersCard();
        instrumentIdentifierCard.number = number;

        var instrumentIdentifier = new cybersourceRestApi.Tmsv1paymentinstrumentsInstrumentIdentifier();
        instrumentIdentifier.card = instrumentIdentifierCard;

        var body = new cybersourceRestApi.Body();
        body.card = card;
        body.billTo = billTo;
        body.instrumentIdentifier = instrumentIdentifier;

        var profileId = '135EEBED-8C51-45E6-BF57-BC8FF99D9E6C';

        console.log('\n*************** Create PaymentInstrument ********************* ');

        instance.tmsV1PaymentinstrumentsPost(profileId, body, function (error, data, response) {
            if (error) {
                console.log('\nError in create PaymentInstrument : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData of Create PaymentInstrument : ' + JSON.stringify(data));
            }
            console.log('\nResponse of  Create PaymentInstrument : ' + JSON.stringify(response));
            console.log('\nResponse Code of Create PaymentInstrument :' + JSON.stringify(response['status']));
            callback(data);
        });

    } catch (error) {
        console.log(error);
    }
}

if (require.main === module) {
    createPaymentInstrument(function () {
        console.log('Create PaymentInstrument end.');
    });
}
module.exports.createPaymentInstrument = createPaymentInstrument;