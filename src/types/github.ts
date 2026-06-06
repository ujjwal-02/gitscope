// This file defines the "shape" of all data in our app
// TypeScript will catch bugs before they happen

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  html_url: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
}

export interface RepoFilters {
  search: string;
  sort: 'stars' | 'forks' | 'updated' | 'name';
  type: 'all' | 'source' | 'fork' | 'archived';
}

export interface GitHubContributor {
  login: string
  avatar_url: string
  contributions: number
  html_url: string
}

export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
  author: {
    avatar_url: string
    login: string
  } | null
}