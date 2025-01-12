'use client';

import Button from 'components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTeam, removeTeam } from '@/app/components/slices/trainer-slice';
import { AppDispatch, RootState } from '@/reduxStore';

import pokeball from '../../../assets/pokeball.png';

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

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <button
          onClick={handleBackClick}
          className='bg-transparent text-white font-bold px-4 py-2 rounded-lg mt-4 mb-4 border-2 border-white hover:bg-white/20 transition'
        >
          ← Back to Home
        </button>
        <h1 className='text-4xl font-bold text-center text-primary mb-6'>
          Poké-teams
        </h1>

        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <input
            type='text'
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder='Enter team name'
            className='px-4 py-2 rounded-lg text-black'
          />
          <Button
            onClick={handleAddTeam}
            text='Add Team'
            className='bg-primary text-white font-bold rounded-lg px-6 py-3 transition-all hover:bg-secondary'
          />
        </div>

        <div>
          {teams.length === 0 ? (
            <div className='col-span-full text-center p-10 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-lg shadow-xl'>
              <p className='text-2xl font-bold mb-4 text-accent'>
                No Poké-teams created!
              </p>
              <p className='text-md font-medium'>
                We gotta catch 'em all so start by creating a team.
              </p>
            </div>
          ) : (
            teams.map((team: Team) => (
              <div
                key={team.teamId}
                className='bg-white flex flex-col sm:flex-row  justify-between items-center bg-opacity-30 hover:bg-opacity-60 rounded-lg p-4 shadow-lg mb-4'
              >
                <h2 className='text-2xl font-semibold text-primary'>
                  {team.name}
                </h2>
                <Image width={50} height={50} src={pokeball} alt='Pokeball' />
                <div className='flex gap-4'>
                  <Button
                    onClick={() => handleNavigateToTeam(team.teamId)}
                    text='Manage Team'
                    className='bg-primary text-white text-sm font-bold rounded-lg px-6 py-3 transition-all hover:bg-secondary'
                  />
                  <Button
                    onClick={() => handleRemoveTeam(team.teamId)}
                    text='Remove Team'
                    className='bg-danger text-sm text-white font-bold rounded-lg px-6 py-3 transition-all hover:bg-danger-dark'
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainersPage;
