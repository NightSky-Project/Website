import axios from 'axios';

const API_URL = process.env.API_URL || "http://localhost:8001";
const API2_URL = process.env.API2_URL || "http://localhost:8000";

import { AxiosResponse, AxiosError } from 'axios';

const handleResponse = (response: AxiosResponse) => response.data;

const handleError = (error: AxiosError) => {
    console.error('API call failed:', error);
    throw new Error('API call failed');
};

export const fetchStorePlugins = async (githubAccessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/store/plugins`, {
            params: { github_access_token: githubAccessToken }
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error as AxiosError);
    }
};

export const fetchGithubRepos = async (githubAccessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/user/repos`, {
            params: { github_access_token: githubAccessToken }
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error as AxiosError);
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API2_URL}/plugins/categories`);
        return handleResponse(response);
    } catch (error) {
        handleError(error as AxiosError);
    }
};

export const createPlugin = async (githubAccessToken: string, name: string, repoId: string, categories: string[], branch: string) => {
    try {
        const response = await axios.post(`${API_URL}/store/plugins`, {
            github_access_token: githubAccessToken,
            name,
            repo_id: repoId,
            categories,
            branch
        });
        return response.status === 201;
    } catch (error) {
        handleError(error as AxiosError);
    }
};

export const updatePlugin = async (githubAccessToken: string, name: string, plugin_id: string, repo_id: string, categories: string[], branch: string) => {
    try {
        const response = await axios.put(`${API_URL}/store/plugins`, {
            github_access_token: githubAccessToken,
            name,
            plugin_id,
            repo_id,
            categories,
            branch
        });
        return response.status === 204;
    } catch (error) {
        handleError(error as AxiosError);
    }
};

export const deletePlugin = async (githubAccessToken: string, repoId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/store/plugins`, {
            data: {
                github_access_token: githubAccessToken,
                repo_id: repoId
            }
        });
        return response.status === 204;
    } catch (error) {
        handleError(error as AxiosError);
    }
};