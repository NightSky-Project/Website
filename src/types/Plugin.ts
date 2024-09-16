type Plugin = {
    plugin_id: bigint;
    plugin_name: string;
    repo_url: string;
    bucket_url: string;
    owner: string;
    categories: string[];
    repo_id: string;
    created_at: string;
    updated_at: string;
    downloads: number;
    status: number;
    version: number;
    description: string;
}

export default Plugin;