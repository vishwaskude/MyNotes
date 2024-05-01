"use client";
import React, { useState, useEffect } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";

type Note = {
  id: number;
  title: string;
  content: string;
};

const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [initialNotes, setInitialNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const cardColors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200']; // Add more colors as needed

  const [formData, setFormData] = useState<Note>({
    id: 0,
    title: '',
    content: '',
  });

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setInitialNotes(JSON.parse(storedNotes));
    } else {
      setInitialNotes(initialNotes);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredNotes(initialNotes);
    } else {
      setFilteredNotes(
        initialNotes.filter(note =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, initialNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: Note = {
      id: initialNotes.length + 1,
      title: formData.title,
      content: formData.content,
    };

    localStorage.setItem('notes', JSON.stringify([...initialNotes, newNote]));
    setInitialNotes([...initialNotes, newNote]);
    setFormData({
      id: 0,
      title: '',
      content: '',
    });
  };

  return (
    <div>
      <input
        onChange={handleChange}
        value={searchTerm}
        className='w-[90%] rounded-sm text-black hover:border-blue-500 my-10 mx-2 h-[35px]'
        type="text"
        id="search-bar"
        placeholder="Search title"
      />
      <button className='bg-green-300 w-[80px] h-[35px] rounded-sm'>
        Search
      </button>
      <h1 className='text-center text-white text-4xl font-bold mb-4'>All notes</h1>
      <div className='flex flex-wrap gap-3 ml-4'>
        {filteredNotes.map((note, index) => (
    <div className={`w-[200px] h-[200px] p-2 rounded-xl ${cardColors[index % cardColors.length]}`} key={note.id}>
    <h2 className='text-black font-semibold text-xl'>{note.title}</h2>
            <p className='text-black'>{note.content}</p>
          </div>
        ))}
      </div>
      <h1 className='text-center my-3 text-4xl font-bold'>Add a new Note</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleFormChange}
            rows={4}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
