import {instance} from './axiosApi';
export async function GetMembers(){
    return await instance.get(`/Member/`);
}
export async function SaveMember(value){
    return await instance.post('/Member',value);
}
export async function UpdateMember(value){
    return await instance.put('/Member',value);
}
export async function DeleteMember(id){
    return await instance.delete(`/Member/${id}`,);
}