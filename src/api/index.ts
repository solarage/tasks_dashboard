import axios from 'axios';

import { IUser, ITask } from 'types';

const BASE_URL = process.env.REACT_APP_BASE_URL ||
 'https://5f5168695e984800161239fc.mockapi.io/api/v1';

type paramsType = { [key: string]: string };

export const fetchUsersApi = async () => {
  try {
    const result: { [key: string]: IUser[] } = await axios.get(
      `${BASE_URL}/users`
    );
    return result.data;
  } catch (error) {
    console.log('Error', error);
  }
};

export const fetchTasksApi = async (params: paramsType) => {
  try {
    const result: { [key: string]: ITask[] } = await axios.get(
      `${BASE_URL}/tasks`, { params }
    );
    return result.data;
  } catch (error) {
    console.log('Error', error);
  }
};

export const fetchCurrentTaskApi = async (id: string) => {
  try {
    const result: { [key: string]: ITask } = await axios.get(
      `${BASE_URL}/tasks/${id}`
    );
    return result.data;
  } catch (error) {
    console.log('Error', error);
  }
};

export const createTaskApi = async (data: ITask) => {
  try {
    const result: { [key: string]: ITask } = await axios.post(
      `${BASE_URL}/tasks`, data
    );
    return result.data;
  } catch (error) {
    console.log('Error', error);
  }
};

export const updateTaskApi = async (id: string, data: ITask) => {
  try {
    const result: { [key: string]: ITask } = await axios.put(
      `${BASE_URL}/tasks/${id}`, data
    );
    return result.data;
  } catch (error) {
    console.log('Error', error);
  }
};

export const deleteTaskApi = async (id: string) => {
  try {
    const result: { [key: string]: ITask } = await axios.delete(
      `${BASE_URL}/tasks/${id}`
    );
    return result.data;
  } catch (error) {
    console.log('Error', error);
  }
};
