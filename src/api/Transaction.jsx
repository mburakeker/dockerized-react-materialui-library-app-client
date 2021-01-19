import {instance} from './axiosApi';

export async function GetSuggestedReturnDate(){
    return await instance.get('/Transaction/GetSuggestedReturnDate');
}
export async function CreateBookTransaction(value){
    return await instance.post('/Transaction',value);
}