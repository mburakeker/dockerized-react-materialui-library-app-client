import {instance} from './axiosApi';

export async function GetSuggestedReturnDate(){
    return await instance.get('/Transaction/GetSuggestedReturnDate');
}