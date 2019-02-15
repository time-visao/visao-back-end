'use strict';

/*
* Merchant configuration properties are taken from Configuration module
*/

// common parameters
const AuthenticationType = 'http_signature';
const RunEnvironment = 'cybersource.environment.SANDBOX';
const MerchantId = 'rappel_br';

// http_signature parameters
const MerchantKeyId = '1d1b2fec-4cdd-4d52-9c97-364c32fd9506';
const MerchantSecretKey = '+g3IZsHJ7k1vioGQOcJ+8XSpxVpb8JC2SHpwaVoKQks=';

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'rappel_br';
const KeyAlias = 'rappel_br';
const KeyPass = 'rappel_br';

// logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = '../log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes

// Constructor for Configuration
function Configuration() {

    var configObj = {
        'authenticationType': AuthenticationType,   
        'runEnvironment': RunEnvironment,

        'merchantID': MerchantId,
        'merchantKeyId': MerchantKeyId,
        'merchantsecretKey': MerchantSecretKey,
        
        'keyAlias': KeyAlias,
        'keyPass': KeyPass,
        'keyFileName': KeyFileName,
        'keysDirectory': KeysDirectory,
        
        'enableLog': EnableLog,
        'logFilename': LogFileName,
        'logDirectory': LogDirectory,
        'logFileMaxSize': LogfileMaxSize
    };
    return configObj;

}

module.exports = Configuration;