import axios from 'axios';

const API_URL = process.env.API_URL || "http://localhost:8001";
const API2_URL = process.env.API2_URL || "http://localhost:8000";

export const fetchStorePlugins = async (githubAccessToken: string) => {
    const response = await axios.get(`${API_URL}/store/plugins`, {
        params: { github_access_token: githubAccessToken }
    });
    return response.data;
};

export const fetchGithubRepos = async (githubAccessToken: string) => {
    const response = await axios.get(`${API_URL}/user/repos`, {
        params: { github_access_token: githubAccessToken }
    });
    return response.data;
}

export const fetchCategories = async () => {
    const response = await axios.get(`${API2_URL}/plugins/categories`)
    return response.data;
};

export const createPlugin = async (githubAccessToken: string, name: string, repoId: string, categories: string[], branch: string) => {
    const response = await axios.post(`${API_URL}/store/plugins`, {
        github_access_token: githubAccessToken,
        name,
        repo_id: repoId,
        categories,
        branch
    });
    return response.status === 201;
};

export const updatePlugin = async (githubAccessToken: string, name: string, repoId: string, categories: string[], branch: string) => {
    const response = await axios.put(`${API_URL}/store/plugins`, {
        github_access_token: githubAccessToken,
        name,
        repo_id: repoId,
        categories,
        branch
    });
    return response.status === 204;
};

export const deletePlugin = async (githubAccessToken: string, repoId: string) => {
    const response = await axios.delete(`${API_URL}/store/plugins`, {
        data: {
            github_access_token: githubAccessToken,
            repo_id: repoId
        }
    });
    return response.status === 204;
};