import Plugin from "@/types/Plugin";

const genFakePluginData = (amount: number): Plugin[] => {
    const plugins = [];
    for(let i = 0; i < amount; i++) {
        plugins.push({
            plugin_id: BigInt(i),
            plugin_name: `Plugin ${i}`,
            repo_url: `www.google.com/${i}`,
            bucket_url: `www.google.com/${i}`,
            owner: `Owner ${i}`,
            categories: ['category1', 'category2'],
            repo_id: `repoId${i}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            downloads: Math.floor(Math.random() * 1000),
            status: Math.floor(Math.random() * 3),
            version: Math.floor(Math.random() * 10),
        });
    }
    return plugins;
}

export default genFakePluginData;