import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GitHubUser, GitHubRepo, GitHubContributor } from '../types/github'

export const githubApi = createApi({
  reducerPath: 'githubApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  }),

  endpoints: (builder) => ({
    getUserByUsername: builder.query<GitHubUser, string>({
      query: (username) => `/users/${username}`,
    }),
    getReposByUsername: builder.query<GitHubRepo[], string>({
      query: (username) =>
        `/users/${username}/repos?per_page=100&sort=updated`,
    }),
    getRepoDetail: builder.query<GitHubRepo, { username: string; repo: string }>({
      query: ({ username, repo }) => `/repos/${username}/${repo}`,
    }),

    getRepoContributors: builder.query<GitHubContributor[], { username: string; repo: string }>({
      query: ({ username, repo }) => `/repos/${username}/${repo}/contributors?per_page=8`,
    }),
  }),
})

export const {
  useGetUserByUsernameQuery,
  useGetReposByUsernameQuery,
  useGetRepoDetailQuery,
  useGetRepoContributorsQuery,
} = githubApi