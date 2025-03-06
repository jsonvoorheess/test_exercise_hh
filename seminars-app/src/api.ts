import axios, { AxiosError } from "axios";
import { Seminar } from "./seminar";

const APi_URL = "http://localhost:3001";

export const api = {
    getSeminars: async (): Promise<Seminar[]> => {
        const response = await axios.get<Seminar[]>(`${APi_URL}/seminars`);
        return response.data;
    },
    deleteSeminar: async (id: number): Promise<void> => {
        const url = `${APi_URL}/seminars/${id}`;
        try {
            const checkResponse = await axios.get(`${APi_URL}/seminars/${id}`);
            if (!checkResponse.data) {
                throw new Error('Семинар не найден');
            }
            await axios.delete(url);
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            console.error('Ошибка при отправке запроса на удаление:', {
                message: axiosError.message,
                status: axiosError.response?.status,
                data: axiosError.response?.data
            });
            throw error;
        }
    },
    updateSeminar: async (id: number, data: Partial<Seminar>): Promise<Seminar> => {
        const response = await axios.patch<Seminar>(`${APi_URL}/seminars/${id}`, data);
        return response.data;
    }
}