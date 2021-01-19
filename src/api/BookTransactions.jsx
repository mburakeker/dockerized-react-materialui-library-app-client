import {instance} from './axiosApi';

export async function GetSuggestedReturnDate(){
    return await instance.get('/Transaction/GetSuggestedReturnDate');
}
export async function CreateBookTransaction(value){
    return await instance.post('/Transaction',value);
}
export async function GetBookTransactions(){
    return await instance.get('/Transaction');
}
export async function ReturnBook(value){
    return await instance.post(`/Transaction/${value}`);
}
export async function GetReturnPriceByTransactionId(value){
    return await instance.get(`/Transaction/GetReturnPriceByTransactionId/${value}`);
}