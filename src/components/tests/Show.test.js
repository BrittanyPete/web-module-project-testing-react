import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const fakeShowData = {
    name: 'Fake Stranger Things',
    summary: 'Fake summary',
    seasons: [
        {
            id: 1,
            name: 'fake episode 1',
            episodes: []
        },
        {
            id: 2,
            name: 'fake episode 2',
            episodes: []
        },
        {
            id: 3,
            name: 'fake episode 3',
            episodes: []
        }
    ], 
}

test('renders without errors', ()=>{
    render(<Show show={fakeShowData} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    const loading = screen.queryByTestId('loading-container');
    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={fakeShowData} selectedSeason={'none'} />);
    const seasons = screen.queryAllByTestId('season-option');
    expect(seasons).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={fakeShowData} selectedSeason={'none'} handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/select a season/i);
    userEvent.selectOptions(select, ['1']);
    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={fakeShowData} selectedSeason={'none'}/>);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={fakeShowData} selectedSeason={1}/>);
    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();
});
