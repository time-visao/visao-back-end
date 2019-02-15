'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var configuration = require('./Data/Configuration.js');

/**
 * This is a sample code to call PaymentApi,
 * createPayment method will create a new payment
 */
function processPayment(token, parcela, callback, enableCapture) {
    try {
        var configObject = new configuration();
        var instance = new cybersourceRestApi.PaymentsApi(configObject);

        var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
        clientReferenceInformation.code = 'test_payment';

        var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
        processingInformation.commerceIndicator = 'internet';

        var subMerchant = new cybersourceRestApi.Ptsv2paymentsAggregatorInformationSubMerchant();
        subMerchant.cardAcceptorId = '1234567890';
        subMerchant.country = 'BR';
        subMerchant.phoneNumber = '4158880000';
        subMerchant.address1 = '1 Market St';
        subMerchant.postalCode = '94105';
        subMerchant.locality = 'San Francisco';
        subMerchant.name = 'Visa Inc';
        subMerchant.administrativeArea = 'CA';
        subMerchant.region = 'PEN';
        subMerchant.email = 'test@cybs.com';

        var aggregatorInformation = new cybersourceRestApi.Ptsv2paymentsAggregatorInformation();
        aggregatorInformation.subMerchant = subMerchant;
        aggregatorInformation.name = 'V-Internatio';
        aggregatorInformation.aggregatorId = '123456789';

        var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
        amountDetails.totalAmount = parseFloat(parcela);
        amountDetails.currency = 'BRL';

        var billTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
        billTo.country = 'BR';
        billTo.firstName = 'John';
        billTo.lastName = 'Deo';
        billTo.phoneNumber = '4158880000';
        billTo.address1 = 'test';
        billTo.postalCode = '94105';
        billTo.locality = 'San Francisco';
        billTo.administrativeArea = 'MI';
        billTo.email = 'test@cybs.com';
        billTo.address2 = 'Address 2';
        billTo.district = 'MI';
        billTo.buildingNumber = '123';
        billTo.company = 'Visa';

        var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
        orderInformation.amountDetails = amountDetails;
        orderInformation.billTo = billTo;

        var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
        var customer = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCustomer();
        customer.customerId = token;
        paymentInformation.customer = customer;

        var request = new cybersourceRestApi.CreatePaymentRequest();
        request.clientReferenceInformation = clientReferenceInformation;
        request.processingInformation = processingInformation;
        request.aggregatorInformation = aggregatorInformation;
        request.orderInformation = orderInformation;
        request.paymentInformation = paymentInformation;

        if (enableCapture === true) {
            request.processingInformation.capture = true;
        }
        console.log('\n*************** Process Payment ********************* ');

        instance.createPayment(request, function (error, data, response) {
            if (error) {
                console.log('\nError in process a payment : ' + JSON.stringify(error));
            }
            else if (data) {
                console.log('\nData of process a payment : ' + JSON.stringify(data));
            }
            console.log('\nResponse of process a payment : ' + JSON.stringify(response));
            console.log('\nResponse Code of process a payment : ' + JSON.stringify(response['status']));
            callback(data);
        });
    } catch (error) {
        console.log(error);
    }
}
if (require.main === module) {
    processPayment(function () {
        console.log('\nProcessPayment end.');
    }, false);
}
module.exports.processPayment = processPayment;