import {instance} from './axiosApi';

export async function GetDailyReport(){
    return await instance.get('/Report');
}