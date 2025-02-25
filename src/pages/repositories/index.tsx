/* eslint-disable padded-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';

interface RepositoryParams {
    repository: string;
}

interface Repositorie {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_counts: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
  }

  interface Issue {
      title: string;
      id: number;
      html_url: string;
      user: {
          login: string;
      }
  }

const Repository: React.FC = () => {

  const [repository, setRepository] = useState<Repositorie | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });

    /* async function loadData() : Promise<void> {
      const [repository, issues] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ]);
    }

    loadData(); */
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Git" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      { repository && (
      <RepositoryInfo>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>starts</span>
          </li>
          <li>
            <strong>{repository.forks_counts}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
