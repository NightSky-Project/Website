export type Plugin = {
    plugin_id: bigint;
    created_at: string;
    plugin_name: string;
    repo_url: string;
    bucket_url: string;
    owner: string; 
    categories: string[]; 
    repo_id: string;
    updated_at: string; 
    downloads: number;
    status: number;
    branch: string;
    version: number;
};

export type Repo = {
    id: string;
    html_url: string | undefined;
    description: string;
    name: string;
    owner: { login: string } | undefined;
    default_branch: string;
};