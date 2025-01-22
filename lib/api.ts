import { API_BASE_URL } from "@/constants/api";
import type { apiDataUser, apiResponse } from "@/types/api";
import { cache } from 'react';

export const apiUsers = cache(async (): Promise<apiResponse> => {
    const usersData: apiResponse = { result: null, error: null };
    try {
                const response = await fetch(
                    `${API_BASE_URL}users`, 
                );
                if (response) {
                    const data: apiDataUser = await response.json();
                    usersData.result = data;
                    if (usersData.result&& usersData.result.total_pages > 0) {
                        const countPages: number = usersData.result.total_pages;
                        let pageUsers;
                        for (let i = 2; i <= countPages; i++) {
                            pageUsers = await fetch(`${API_BASE_URL}users/?page=${i}`);
                            usersData.result.data.push(...(await pageUsers.json()).data);
                        }
                    }
                    
                    
                } else {
                    usersData.error = 'Не удалось получить пользователей из api';
                }
            } catch (err: unknown) {
                if (err instanceof Error)
                    usersData.error = err.message
                else 
                    usersData.error = 'Неизвестная ошибка';
            }  finally {
                return usersData;
            } 
});


export async function apiDeleteUser (id: string) {
    const data: { result: null | boolean, error: null | string } = { result: null, error: null };
    try {
        const response = await fetch(
            `${API_BASE_URL}users/${id}`, 
            {
                method: 'DELETE',
            }
        );
        if (response.status == 204) {
            data.result = true;
        } else {
            data.error = 'Не удалось получить пользователей из api';
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            data.error = err.message;
        }   
        else {
            data.error = 'Неизвестная ошибка';
        }
    }  finally {
        return data;
    } 
};