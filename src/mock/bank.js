const Mock = require('mockjs');
const Random = Mock.Random;

export const bank = [{
    path: '/loan/record',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data: []
        };
        for (let i = 0; i < 100; i++) {
            let loan = {
                transId: Random.integer(0, 1000000),
                name: Random.cname(),
                loanDate: 1539911101000,
                loanAmount: Random.float(0, 1000000),
                insCount: Random.integer(0, 1000000),
                loanInterest: Random.float(0, 1),
                loanAmountSum: Random.float(0, 1000000),
                recoveredAmount: Random.float(0, 1000000),
                loanStatus: Random.integer(0, 3)
            };
            result.data.push(loan);
        }
        return result;
    }
}, {
    path: '/loan',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:{
                loan:{}
            }
        };
        let loan = {
            transId: Random.integer(0, 1000000),
            account: Random.integer(0, 1000000),
            transDate: 1539911101000,
            loanAmount: Random.integer(0, 1000000),
            insCount: Random.integer(0, 30),
            loanInterest: Random.float(0, 1),
            loanAmountSum: Random.integer(0, 1000000),
            expirationDate: 1539911101000,
            recoveredAmount: Random.integer(0, 1000000),
            loanStatus: Random.integer(1, 3),
            loadTypeName: Random.string(1, 5),
            reviewId: Random.string(1, 5)
        };
        result.data.loan=loan;
        console.log(result);
        return result;
    }
},{
    path: '/loan/payment',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:{
                bankPayment:[]
            }
        };
       for(let i=0;i<10;i++){
           let payment={
               paymentId:Random.integer(1,1000),
               insNum:i+1,
               paymentAmount:Random.integer(1,1000),
               paymentDate:1539911101000
           }; 
           result.data.bankPayment.push(payment);
       }
        return result;
    }
}, {
    path: '/clearing/draftrecord',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:[]
        };
       for(let i=0;i<1000;i++){
           let record={
            transferId:Random.integer(0, 10000000),
            transferoutAccount:Random.integer(0, 10000000000),
            transferInAccount:Random.integer(0, 10000000000),
            amount:Random.integer(0, 100000000),
            transferDate:1539911101000,
            receiveDate:1539911101000
           }; 
           result.data.push(record);
       }
        return result;
    }
},{
    path: '/investment/fundproduct',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:[]
        };
       for(let i=0;i<1000;i++){
           let record={
            fundId:Random.integer(0, 10000000),
            type:Random.integer(0, 1),
            purchaseRate:Random.float(10, 100, 1, 2),
            netAssetValue:Random.float(1, 5, 1, 4),
            redemptionRate:Random.float(10, 100, 1, 2),
            recordDate:1539911101000
           }; 
           result.data.push(record);
       }
        return result;
    }
},{
    path: '/investment/fundlog',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:[]
        };
       for(let i=0;i<1000;i++){
           let record={
            fundTxId:Random.integer(0, 10000000),
            custId:Random.integer(0, 10000000),
            account: Random.integer(0, 10000000),
            fundId: Random.integer(0, 10000000),
            type:Random.integer(0, 1),
            amount: Random.integer(0, 10000000),
            share:Random.integer(1, 1000),
            txDate:1539911101000,
            reviewId:Random.integer(0, 10000000)
           }; 
           result.data.push(record);
       }
        return result;
    }
},{
    path: '/investment/fundhold',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:[]
        };
       for(let i=0;i<1000;i++){
           let record={
            custId:Random.integer(0, 10000000),
            account: Random.integer(0, 10000000),
            fundId: Random.integer(0, 10000000),
            share:Random.integer(1, 1000)
           }; 
           result.data.push(record);
       }
        return result;
    }
}];