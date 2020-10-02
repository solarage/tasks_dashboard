/* eslint-disable @typescript-eslint/await-thenable */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { handleKeyDown } from '../utils/utils';

import '@/styles/Search.scss';

import { ANY, ITask } from 'types';

interface Props {
  onSearch: React.Dispatch<React.SetStateAction<{[key: string]: string}>>
}

const Search: React.FunctionComponent<Props> = ({ onSearch }) => {
  const history = useHistory();
  const [text, setText] = useState('');
  const [searchingResults, setSearchingResults] = useState<ITask[]>(null);
  
  async function handleSubmit(event:React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    if (!text) return;

    const result: ANY = await onSearch({ search: text });

    setSearchingResults(result);
  }

  function openEditPage(id: string) {
    clearSearch();
    history.push(`/tasks/${id}`);
  }

  function clearSearch() {
    setText(null);
    setSearchingResults(null);
  }

  return (
    <div className="search-container">
      <form className="search-section">
        <button className="search-icon" type="submit" onClick={handleSubmit} />
        <input
          className="search"
          type="search"
          onChange={({ target: { value } }) => setText(value)}
          onKeyDown={(event) => handleKeyDown(event, handleSubmit)}
          placeholder="Search..."
        />
      </form>
      {searchingResults && (
        <div className="result-section">
          <div className="title">Results</div>
          <div className="description">{`Tasks containing "${text}"`}</div>
          <div className="result">
            {searchingResults.map((task) => (
              <div key={task.id}>
                <span>{task.name}</span>
                <span
                  className="edit-btn"
                  onClick={() => openEditPage(task.id)}
                />
              </div>
            ))}
          </div>

          <button onClick={clearSearch} className="close_btn" />
        </div>
      )}
    </div>
  );
};

export default Search;
