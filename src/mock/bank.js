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
    // path: RegExp('/loan' + ".*"),
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
    // path: '/loan/payment',
    path: RegExp('/loan/paylog/' + ".*"),
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:[]
        };
        for (let i = 0; i < 10; i++) {
            let payment = {
                paylogId: Random.integer(1, 1000),
                payAmount: Random.integer(1, 1000),
                payDate: 1539911101000,
                account:Random.integer(1, 1000)
            };
            result.data.push(payment);
        }
        return result;
    }
}, {
    // path: '/loan/payment',
    path: RegExp('/loan/payment/' + ".*"),
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:[]
        };
        for (let i = 0; i < 12; i++) {
            let payment = {
                paymentId: Random.integer(1, 1000),
                paymentAmount: Random.integer(1, 1000),
                paymentDate: 1539911101000,
                insNum:i+1,
                isFinished:Random.boolean(),
                reimbursement: Random.integer(1, 1000),
                allPaymentAmount:Random.integer(1, 1000)
            };
            result.data.push(payment);
        }
        return result;
    }
},{
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
        let result = {
            status: 200,
            msg: '',
            data: {}
        };
        let data = {
            userId: '1',
            userName: '张三',
            userType: '银行员工',
            phone: '1234567890',
            address: '12400 Imperial Hwy, Norwalk, CA 90650',
            email: "zhangsuan@qq.com"
        }
        result.data=data;
        return result;
    }
},{
    path: RegExp('/user/register' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: 1
        };
        return result;
    }
}, {
    path: RegExp('/user/changepassword' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: RegExp('/user/changeinfo' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: RegExp('/clearing/remitapplyform' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: RegExp('/clearing/remitdrawingform' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: RegExp('/clearing/transferapplyform' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: RegExp('/investment/fundpurchaseform' + ".*"),
    type: 'post',
    data(option) {
        let result = {
            status: 200,
            msg: '',
            data: {}
        };

        return result;
    }
}, {
    path: '/clearing/transferlog',
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
            transferOutAccount:Random.integer(0, 10000000000),
            transferInAccount:Random.integer(0, 10000000000),
            amount:Random.integer(0, 100000000),
            transferDate:1539911101000,
            receiveDate:1539911101000
           }; 
           result.data.push(record);
       }
        return result;
    }
}, {
    path: '/clearing/remitlog',
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
            remitId:Random.integer(0, 10000000),
            remitOutAccount:Random.integer(0, 10000000000),
            remitInAccount:Random.integer(0, 10000000000),
            amount:Random.integer(0, 100000000),
            remitGenerateDate:1539911101000,
            remitArriveDate:1539911101000
           }; 
           result.data.push(record);
       }
        return result;
    }
}, {
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
            purchaseDate:1539911101000
           }; 
           result.data.push(record);
       }
        return result;
    }
}, {
    path: '/investment/funddetail',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:{
                fundDetail:{}
            }
        };
        let detail={
            fundId:Random.integer(0, 10000000),
            type:Random.integer(0, 1),
            purchaseRate:Random.float(10, 100, 1, 2),
            netAssetValue:Random.float(1, 5, 1, 4),
            redemptionRate:Random.float(10, 100, 1, 2),
            purchaseDate:1539911101000
        }; 
        result.data.fundDetail = detail;
        return result;
    }
}, {
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
}, {
    path: '/investment/fundlogdetail',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data:{
                fundLogDetail:{}
            }
        };
        let detail={
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
        result.data.fundLogDetail = detail;
        return result;
    }
}, {
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
            netAssetValue: Random.float(1, 5, 1, 4),
            share:Random.integer(1, 1000)
           }; 
           result.data.push(record);
       }
        return result;
    }
}, {
    path: '/investment/fundholddetail',
    type: 'get',
    data(option) {
        let req = JSON.parse(option.body);
        let result = {
            status: 200,
            msg: '',
            data: {
                fundHoldDetail:{}
            }
        };
           let detail={
            custId:Random.integer(0, 10000000),
            account: Random.integer(0, 10000000),
            fundId: Random.integer(0, 10000000)
           }; 
           result.data.fundHoldDetail = detail;
        return result;
    }

}];