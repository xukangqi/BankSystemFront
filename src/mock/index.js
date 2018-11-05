import Mock from 'mockjs';
import {bank} from  './bank.js';
import {user} from './user.js';


//mock数据，测试时默认开启时
let data=[].concat(
    // bank,
    // user
);

data.forEach((res)=>{
    Mock.mock(res.path,res.type,res.data);
});