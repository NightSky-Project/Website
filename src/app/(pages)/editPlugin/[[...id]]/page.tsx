'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Text from '@/components/text';
import { useParams } from 'next/navigation';
import { styled } from '../../../../../stitches.config';
import Topbar from '@/components/topbar';
import Footer from '@/components/footer';
import { createPlugin, fetchCategories, fetchGithubRepos, fetchStorePlugins, updatePlugin } from '@/services/pluginsApi';
import getSession from '@/utils/getSession';
import {Plugin, Repo} from '@/types/Plugin';

const Header = styled("header", {
    marginBottom: '1rem',
});

const Form = styled("div", {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.3rem',
    paddingInline: '1rem',
    borderRadius: '10px',
    border: '1px solid $tertiary',
    paddingInlineEnd: '3rem',
    paddingInlineStart: '3rem',
    paddingBlockStart: '1rem',
    paddingBlockEnd: '5rem',
});

const Input = styled("input", {
    padding: '0.2rem',
    borderRadius: '5px',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',
    variants: {
        borderType:{
            '1': {
                border: '1px solid $tertiary',
            },
            '2': {
                border: '1px solid red',
            },
        },
        size: {
            '1': {
                width: '100%',
            },
            '2': {
                width: '75%',
            },
            '3': {
                width: '25%',
            },
            '4': {
                width: '15%',
            },
        },
    },
});

const Select = styled("select", {
    padding: '0.2rem',
    borderRadius: '5px',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',

    variants: {
        borderType:{
            '1': {
                border: '1px solid $tertiary',
            },
            '2': {
                border: '1px solid red',
            },
        },
        size: {
            '1': {
                width: '100%',
            },
            '2': {
                width: '75%',
            },
            '3': {
                width: '25%',
            },
            '4': {
                width: '15%',
            },
        },
    },

});

const Categories = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    gap: '0.2rem',
    padding: '0.2rem',
    borderRadius: '5px',
    border: '1px solid $tertiary',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: '1rem',
});

const CategoryTag = styled("div", {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.2rem',
    borderRadius: '15px',
    border: '1px solid $tertiary',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$small',
});

const CategoryButton = styled("button", {
    border: 'none',
    backgroundColor: '$foreground',
    color: '$secondary',
    fontSize: '$small',
    cursor: 'pointer',
    marginInlineStart: '0.2rem',
});

const RepoInfo = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.2rem',
    padding: '0.2rem',
    borderRadius: '5px',
    border: '1px solid $tertiary',
    color: '$primary',
    fontSize: '$0',
    maxWidth: '100%',
});
const SubmitButton = styled("button", {
    padding: '0.2rem',
    borderRadius: '5px',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',
    cursor: 'pointer',
    border: '1px solid $tertiary',
});

const EditPlugin = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [repoSelected, setRepoSelected] = useState<Repo | null>(null);
    const [userRepos, setUserRepos] = useState<Repo[]>([]);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const categories = await fetchCategories();
                setCategories(categories);

                const session = await getSession();
                if (session?.accessToken) {
                    const repos = await fetchGithubRepos(session.accessToken) as Repo[];
                    setUserRepos(repos);

                    if (id) {
                        const plugins = await fetchStorePlugins(session.accessToken);
                        const foundPlugin = plugins.find((plugin: Plugin) => plugin.plugin_id.toString() === id[0]);
                        if (foundPlugin) {
                            setName(foundPlugin.plugin_name);
                            setBranch(foundPlugin.branch);
                            const repo =  repos.find((repo: Repo) => repo.id.toString() === foundPlugin.repo_id);
                            const repoDescription = repo?.description;
                            const repoName = repo?.name;
                            setRepoSelected({
                                id: foundPlugin.repo_id,
                                name: repoName || '',
                                description: repoDescription || '',
                                default_branch: foundPlugin.branch,
                                html_url: '',
                                owner: { login: '' },
                            });
                            setSelectedCategories(foundPlugin.categories);
                        }
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading data', error);
            }
        };
        load();
    }, [id]);

    const handleAddCategory = (category: string) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleRemoveCategory = (category: string) => {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
    };

    const handleSelectRepo = (repo: Repo) => {
        setRepoSelected(repo);
        setBranch(repo.default_branch);
    };

    const handleSubmit = async () => {
        if (name === '' || !repoSelected || branch === '' || selectedCategories.length === 0) {
            setMissingFields([
                !name ? 'name' : '',
                !repoSelected ? 'repo' : '',
                !branch ? 'branch' : '',
                selectedCategories.length === 0 ? 'category' : '',
            ]);
            return;
        }
        setMissingFields([]);
        try {
            const session = await getSession();
            if (session?.accessToken) {
                const plugin = {
                    github_access_token: session.accessToken,
                    plugin_id: id ? id[0] : '-1',
                    repo_id: repoSelected.id,
                    name: name,
                    branch: branch,
                    categories: selectedCategories,
                };
                const success = id
                    ? await updatePlugin(plugin.github_access_token, plugin.name, plugin.plugin_id, plugin.repo_id, plugin.categories, plugin.branch)
                    : await createPlugin(plugin.github_access_token, plugin.name, plugin.repo_id, plugin.categories, plugin.branch);

                if (success) {
                    window.location.href = '/dashboard';
                }
            }
        } catch (error) {
            console.error(error);
            alert(`Error ${id ? 'updating' : 'creating'} plugin`);
            window.location.href = '/dashboard';
        }
    };

    return (
        <>
            <Topbar />
            <div className='page-wide'>
                <Header>
                    <Text size='2' as='h1'>{id ? 'Edit Plugin' : 'Create Plugin'}</Text>
                </Header>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <main style={{ display: 'grid', width: '100%', height: '100%', alignContent: 'center' }}>
                        <Form>
                            <Input
                                borderType={missingFields.includes('name') ? 2 : 1}
                                size={1}
                                placeholder='Plugin Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Categories>
                                {selectedCategories.length === 0 && (
                                    <Text size='small' style={{ opacity: 0.3 }}>No categories selected</Text>
                                )}
                                {selectedCategories.map((category) => (
                                    <CategoryTag key={category}>
                                        <Text size='small'>{category}</Text>
                                        <CategoryButton type="button" onClick={() => handleRemoveCategory(category)}>X</CategoryButton>
                                    </CategoryTag>
                                ))}
                            </Categories>
                            <Select
                                borderType={missingFields.includes('category') ? 2 : 1}
                                onChange={(e) => handleAddCategory(e.target.value)}
                                value=""
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.filter(category => !selectedCategories.includes(category)).map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Select>
                            <div style={{ width: '100%' }} />
                            <hr style={{ width: '100%', border: '1px solid $tertiary', marginBlockEnd: '0.3rem' }} />
                            <Select
                                borderType={missingFields.includes('repo') ? 2 : 1}
                                size={2}
                                value={repoSelected?.id || ''}
                            >
                                <option value="" disabled>Select Repository</option>
                                {userRepos.map((repo: Repo) => (
                                    <option key={repo.id} value={repo.id} onClick={() => handleSelectRepo(repo)}>{repo.name}</option>
                                ))}
                            </Select>
                            <div style={{ width: '100%' }} />
                            {repoSelected && (
                                <RepoInfo>
                                    <Text size='small'>{repoSelected.name}</Text>
                                    <Text size='small'>{repoSelected.description}</Text>
                                </RepoInfo>
                            )}
                            <div style={{ width: '100%' }} />
                            {repoSelected && (
                                <Input
                                    borderType={missingFields.includes('branch') ? 2 : 1}
                                    size={3}
                                    placeholder='Branch'
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                />
                            )}
                            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                        </Form>
                    </main>
                    )
                }
            </div>
            <Footer />
        </>
    );
};

export default EditPlugin;