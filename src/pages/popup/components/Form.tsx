import React from 'react';
import tagManager from '../../../API/TagManagerApi';
import useForm from '../../../hooks/useForm';
import { FormPopupFormProps } from '../../../interfaces/BookmarkProps';

const searchMethod = async (query: string): Promise<string[]> => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(800);

  const response = await tagManager.getTags(query);
  return response;
};

const Form = ({ currentTab }: FormPopupFormProps) => {
  const { values, handleChange, handleSubmit, searchResults } = useForm({
    initialValues: {
      bookmarkName: currentTab.title ?? '',
      url: currentTab.url ?? '',
      search: '',
    },
    searchMethod,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  React.useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div className="flex flex-col gap-3 py-2">
      <h3 className="text-lg font-semibold">Edit Bookmark</h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center">
          <label htmlFor="bookmarkName" className="w-1/4">
            Name
          </label>
          <input
            name="bookmarkName"
            type="text"
            placeholder="Bookmark Name"
            className="w-3/4 p-2 border border-gray-300 rounded text-slate-800"
            value={values.bookmarkName}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 items-center">
          <label htmlFor="search" className="w-1/4">
            Tags
          </label>

          <input
            name="search"
            type="text"
            placeholder="Add tag"
            className="w-3/4 p-2 border border-gray-300 rounded text-slate-800"
            value={values.bookmarkTag}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 justify-end items-center">
          <button
            type="button"
            className="w-24 px-3 py-2 rounded-full bg-blue-dark blue-light text-sm"
          >
            Remove
          </button>
          <button
            type="submit"
            className="w-24 px-3 py-2 rounded-full bg-blue-light blue-dark text-sm"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
