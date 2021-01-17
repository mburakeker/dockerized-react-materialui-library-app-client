import {instance} from './axiosApi';

export async function GetBooksByText(value){
    return await instance.get(`/Book/${value}`);
}