'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Text from '@/components/text';
import { useParams } from 'next/navigation';
import { styled } from '../../../../stitches.config';
import Topbar from '@/components/topbar';
import Footer from '@/components/footer';
import { fetchCategories, fetchGithubRepos, fetchStorePlugins } from '@/services/pluginsApi';
import getSession from '@/utils/getSession';
import Plugin from '@/types/Plugin';

const Header = styled("header", {
    marginBottom: '1rem',
});

const Form = styled("form", {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.2rem',
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
    border: '1px solid $tertiary',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',
    variants: {
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
    border: '1px solid $tertiary',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',

    variants: {
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

const RepoSelected = styled("div", {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.2rem',
    padding: '0.2rem',
    borderRadius: '5px',
    border: '1px solid $tertiary',
    backgroundColor: '$foreground',
    color: '$primary',
    fontSize: '$0',
});

const RepoButton = styled("button", {
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

type Repo = {
    id: string;
    name: string;
    description: string;
    default_branch: string;
};

const CreatePlugin = () => {
    const {id} = useParams();
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [repoSelected, setRepoSelected] = useState<Repo | null>(null);
    const [userRepos, setUserRepos] = useState<Repo[]>([]);
    const [missingFields, setMissingFields] = useState<string[]>([]);

    useEffect(() => {
        const load = async () => {
            await fetchCategories().then(setCategories);
            const session = await getSession();
            if(id) {
                // fetch plugin details
                if (session?.accessToken) {
                    await fetchStorePlugins(session.accessToken).then((plugins) => {
                        const foundPlugin = plugins.find((plugin: Plugin) => plugin.plugin_id === BigInt(id as string));
                        if (foundPlugin) {
                            setName(foundPlugin.name);
                            setBranch(foundPlugin.branch);
                            setRepoSelected({id: foundPlugin.repo_id, name: foundPlugin.repo_url, description: foundPlugin.description, default_branch: foundPlugin.default_branch});
                            setSelectedCategories(foundPlugin.categories);
                        }
                    });
                }
            }
            if (session?.accessToken) {
                // fetch user repos
                const repos = await fetchGithubRepos(session.accessToken);
                setUserRepos(repos);
            }
        }
        load();
    }, [id]);

    const handleAddCategory = (category: string) => {
        setSelectedCategories([...selectedCategories, category]);
    };

    const handleRemoveCategory = (category: string) => {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
    };

    const handleSelectRepo = (repo: Repo) => {
        setRepoSelected(repo);
        setBranch(repo.default_branch);
    };



    return (
        <>
            <Topbar />
                <div className='page-wide'>
                    <Header>
                        <Text size='2' as={'h1'} >Create Plugin</Text>
                    </Header>
                    <main style={{display: 'grid', width: '100%', height: '100%', alignContent: 'center'}}>
                        <Form>
                            <Input size={1} placeholder='Plugin Name' value={name} onChange={(e) => setName(e.target.value)} />
                            <Categories>
                                {
                                    selectedCategories.length === 0 && (
                                        <Text size='small' style={{opacity: 0.3}}>No categories selected</Text>
                                    )
                                }
                                {selectedCategories.map((category) => (
                                    <CategoryTag key={category}>
                                        <Text size='small'>{category}</Text>
                                        <CategoryButton type="button" onClick={() => handleRemoveCategory(category)}>X</CategoryButton>
                                    </CategoryTag>
                                ))}
                            </Categories>
                            <Select onChange={(e) => handleAddCategory(e.target.value)} value="">
                                <option value="" disabled>Select Category</option>
                                {categories.filter(category => !selectedCategories.includes(category)).map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Select>
                            <div style={{width: '100%'}} />
                            <hr style={{
                                width: '100%',
                                border: '1px solid $tertiary',
                                marginBlockEnd: '0.3rem',
                            }} />
                            <Select size={2} onChange={(e) => setRepoSelected(userRepos.find(repo => repo.id === e.target.value) || null)} value={repoSelected?.id || ''}>
                                <option value="" disabled>Select Repository</option>
                                {userRepos.map((repo: Repo) => (
                                    <option key={repo.id} value={repo.id} onClick={
                                        () => handleSelectRepo(repo)
                                    }>{repo.name}</option>
                                ))}
                            </Select>
                            {
                                repoSelected && (
                                    <RepoInfo>
                                        <Text size='small'>{userRepos.find(repo => repo.id === repoSelected.id)?.name}</Text>
                                        <Text size='small'>{userRepos.find(repo => repo.id === repoSelected.id)?.description}</Text>
                                    </RepoInfo>
                                )
                            }
                            <div style={{width: '100%'}} />
                            {
                                repoSelected && (
                                    <Input size={3} placeholder='Branch' value={branch} onChange={(e) => setBranch(e.target.value)} />
                                )
                            }
                        </Form>
                    </main>
                </div>
            <Footer/>
        </>
    );
};

export default CreatePlugin;