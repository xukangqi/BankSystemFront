const Mock = require('mockjs');
const Random = Mock.Random;

export const bank = [{
    path: '/loan/allRecord',
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
            data: {
                loan: {}
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
        result.data.loan = loan;
        return result;
    }
}, {
    path: '/loan/payment',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data: {
                bankPayment: []
            }
        };
        for (let i = 0; i < 10; i++) {
            let payment = {
                paymentId: Random.integer(1, 1000),
                insNum: i + 1,
                paymentAmount: Random.integer(1, 1000),
                paymentDate: 1539911101000
            };
            result.data.bankPayment.push(payment);
        }
        return result;
    }
}, {
    path: '/loan/interestRate/1',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {
                bankLoadType: {}
            }
        };
        result.data.bankLoadType.periodOne = Random.float(0, 5);
        result.data.bankLoadType.periodTwo = Random.float(0, 5);
        result.data.bankLoadType.periodThree = Random.float(0, 5);
        // console.log(result);
        return result;
    }
}, {
    path: '/loan/interestRate/1',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {
                bankLoadType: {}
            }
        };
        result.data.bankLoadType.periodOne = Random.float(0, 5);
        result.data.bankLoadType.periodTwo = Random.float(0, 5);
        result.data.bankLoadType.periodThree = Random.float(0, 5);
        // console.log(result);
        return result;
    }
}, {
    path: '/loan/interestRate/2',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {
                bankLoadType: {}
            }
        };
        result.data.bankLoadType.periodOne = Random.float(0, 5);
        result.data.bankLoadType.periodTwo = Random.float(0, 5);
        result.data.bankLoadType.periodThree = Random.float(0, 5);
        // console.log(result);
        return result;
    }
}, {
    path: '/loan/interestRate/3',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {
                bankLoadType: {}
            }
        };
        result.data.bankLoadType.periodOne = Random.float(0, 5);
        result.data.bankLoadType.periodTwo = Random.float(0, 5);
        result.data.bankLoadType.periodThree = Random.float(0, 5);
        // console.log(result);
        return result;
    }
}, {
    path: '/loan/interestRate/4',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {
                bankLoadType: {}
            }
        };
        result.data.bankLoadType.periodOne = Random.float(0, 5);
        result.data.bankLoadType.periodTwo = Random.float(0, 5);
        result.data.bankLoadType.periodThree = Random.float(0, 5);
        // console.log(result);
        return result;
    }
}, {
    path: RegExp('/loan/apply' + ".*"),
    type: 'post',
    data(option) {
        let req = JSON.parse(option.body);
        console.log(req);
        console.log(option);
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: RegExp('/loan/payment' + ".*"),
    type: 'post',
    data(option) {
        let req = JSON.parse(option.body);
        console.log(req);
        console.log(option);
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: '/customer/all',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: []
        };
        for (let i = 0; i < 10; i++) {
            let customer = {
                custId: Random.string(3, 7),
                custName: Random.cname(),
                password: Random.string(3, 7),
                identityCard: Random.string(15, 18),
                address: Random.string(3, 7),
                phone: Random.string(11, 11),
                email: Random.email('123.com'),
                sex: Random.boolean(),
                custType: Random.integer(1, 2),
                credit: Random.integer(1, 3)
            };
            result.data.push(customer);
        }
        // console.log(result);
        return result;
    }
},{
    path: RegExp('/customer/' + ".*"),
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {
                BankCustomer:{}
            }
        };
            let customer = {
                custId: Random.string(3, 7),
                custName: Random.cname(),
                password: Random.string(3, 7),
                identityCard: Random.string(15, 18),
                address: Random.string(3, 7),
                phone: Random.string(11, 11),
                email: Random.email('123.com'),
                sex: Random.boolean(),
                custType: Random.integer(1, 2),
                credit: Random.integer(1, 3)
            };
            result.data.BankCustomer=customer;
        // console.log(result);
        return result;
    }
}];