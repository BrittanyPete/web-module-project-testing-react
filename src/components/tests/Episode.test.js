import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const fakeEpisode = {
    id: 123,
    image: 'https://i.ibb.co/2FsfXqM/stranger-things.png',
    name: 'Episode',
    season: 2,
    number: 2,
    summary: 'this is the summary',
    runtime: 4
}

test("renders without error", () => {
    render(<Episode episode={fakeEpisode} />);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={fakeEpisode}/>);
    const summary = screen.queryByText(/this is the summary/i);
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent(/this is the summary/i);
    expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", ()=>{
    const fakeEpisode2 = {
        id: 124,
        image: null,
        name: 'Episode',
        season: 2,
        number: 3,
        summary: 'this is the summary',
        runtime: 44
    };
    render(<Episode episode={fakeEpisode2}/>);
    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    expect(image).toBeInTheDocument();
});
