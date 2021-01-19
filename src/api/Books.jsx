import {instance} from './axiosApi';
export async function GetBooks(){
    return await instance.get(`/Book/`);
}
export async function GetBooksByText(value){
    return await instance.get(`/Book/${value}`);
}
export async function SaveBook(value){
    return await instance.post('/Book',value);
}