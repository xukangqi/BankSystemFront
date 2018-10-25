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
}, {
    // path: RegExp('/customer/' + ".*"),
    path: '/customer/123',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {
                BankCustomer: {}
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
        result.data.BankCustomer = customer;
        // console.log(result);
        return result;
    }
}, {
    path: RegExp('/customer/account/' + ".*"),
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: []
        };
        for (let i = 0; i < 5; i++) {
            let account = {
                account: Random.string(13, 15),
                depositBank: Random.string(3, 7),
                balances: Random.integer(10000, 100000),
                blockedBalances: Random.integer(10000, 100000),
                accountType: Random.integer(1, 2),
                accountKind: Random.integer(1, 3),
                accountStatus: Random.integer(1, 3)
            };
            result.data.push(account);
        }

        // console.log(result);
        return result;
    }
}, {
    path: RegExp('/customer/account/delete' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: ''
        };
        return result;
    }
}, {
    path: RegExp('/money/deposit/' + ".*"),
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: []
        };
        for (let i = 0; i < 10; i++) {
            let record = {
                depositId: Random.string(4, 7),
                depositType: Random.string(4, 7),
                depositMoney: Random.integer(10000, 100000),
                depositRate: Random.integer(1, 5),
                depositDate: 1539911101000,
                depositDuration: Random.string(4, 7),
                transferWay: Random.string(4, 7),
                reviewerId: Random.string(4, 7),
            };
            result.data.push(record);
        }
        return result;
    }
}, {
    path: RegExp('/money/withdraw/' + ".*"),
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: []
        };
        for (let i = 0; i < 10; i++) {
            let record = {
                withdrawId: Random.string(4, 7),
                withdrawMoney: Random.integer(10000, 100000),
                withdrawDate: 1539911101000,
                arriveTime: 1539911101000,
                reviewerId: Random.string(4, 7),
            };
            result.data.push(record);
        }
        return result;
    }
}, {
    path: '/money/interestrate',
    type: 'get',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {}
        };
        let data = {
            currentRate: 0.35,
            zczqTmRate: 1.1,
            zczqHyRate: 1.3,
            zczqOyRate: 1.5,
            zczqTwyRate: 2.1,
            zczqTyRate: 2.75,
            zczqFyRate: 3.2,
            otherOyRate: 1.3,
            otherTyRate: 2.5,
            otherFyRate: 3.0
        }
        result.data=data;
        return result;
    }
},{
    path: RegExp('/user/login' + ".*"),
    type: 'post',
    data(option) {
        console.log('get111');
        let result = {
            status: 200,
            msg: '',
            data: {}
        };
        let data = {
            userId: '1',
            userName: '张三',
            userType: 'VIP',
            phone: '1234567890',
            address: '12400 Imperial Hwy, Norwalk, CA 90650',
            email: "zhangsuan@qq.com"
        }
        result.data=data;
        return result;
    }
}];