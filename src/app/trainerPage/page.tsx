'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam, removeTeam } from '@/app/components/slices/trainer-slice';
import { AppDispatch, RootState } from '@/reduxStore';

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  types: string[];
}

interface Team {
  teamId: number;
  name: string;
  pokemons: Pokemon[];
}

const TrainersPage: React.FC = () => {
  const teams = useSelector((state: RootState) => state.trainer.teams);
  const [teamName, setTeamName] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleAddTeam = () => {
    if (teamName.trim() !== '') {
      dispatch(addTeam({ name: teamName }));
      setTeamName('');
    }
  };

  const handleRemoveTeam = (teamId: number) => {
    dispatch(removeTeam(teamId));
  };

  const handleNavigateToTeam = (teamId: number) => {
    router.push(`/trainerPage/${teamId}`);
  };

  return (
    <div>
      <h1>Trainers</h1>

      <div>
        <input
          type='text'
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder='Enter team name'
        />
        <button onClick={handleAddTeam}>Add Team</button>
      </div>

      <div>
        {teams.length === 0 ? (
          <p>No teams created yet</p>
        ) : (
          teams.map((team: Team) => (
            <div key={team.teamId}>
              <h2>{team.name}</h2>
              <button onClick={() => handleNavigateToTeam(team.teamId)}>
                Manage Team
              </button>
              <button onClick={() => handleRemoveTeam(team.teamId)}>
                Remove Team
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainersPage;
