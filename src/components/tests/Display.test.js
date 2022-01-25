import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');


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

test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(fakeShowData);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    mockFetchShow.mockResolvedValueOnce(fakeShowData);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(3);
    });
});

test('displayFunc is called when the fetch button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(fakeShowData);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(()=>{
        expect(displayFunc).toHaveBeenCalled();
    });
});
