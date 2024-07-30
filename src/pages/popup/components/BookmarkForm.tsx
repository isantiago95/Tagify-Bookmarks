import React from 'react';
import tagManager from '../../../API/TagManagerApi';
import useForm from '../../../hooks/useForm';
import { FormPopupFormProps } from '../../../interfaces/BookmarkProps';
import bookmarksApi from '../../../API/BookmarksApi';

const searchMethod = async (query: string): Promise<string[]> =>
  await tagManager.getTags(query);

const BookmarkForm = ({ currentTab }: FormPopupFormProps) => {
  const {
    updateArray,
    handleChange,
    handleSubmit,
    loading,
    resetResults,
    resetValue,
    searchResults,
    values,
  } = useForm({
    initialValues: {
      ...currentTab,
      searchTag: '',
      tags: [],
    },
    searchMethod,
    onSubmit: async (values) => {
      console.log('BookmarkForm submitted:', values);
      const { tags, searchTag, ...rest } = values;

      const response = await bookmarksApi.createOrUpdate(rest);

      console.log(response);

      // window.close();
    },
  });

  React.useEffect(() => {
    console.log('form Values: ', values);
  }, [values]);

  const saveTagOnTabKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchTag = (values.searchTag as string).trim();
    if (e.key === 'Tab' && searchTag) {
      e.preventDefault();
      resetValue('searchTag');
      updateArray('tags', searchTag, 'add');
      resetResults();
    }
  };

  const handleRemoveBookmark = async () => {
    await bookmarksApi.remove(currentTab.id);
    window.close();
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      <h3 className="text-lg font-semibold">Edit Bookmark</h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center">
          <label htmlFor="title" className="w-1/4">
            Name
          </label>
          <input
            name="title"
            type="text"
            placeholder="Bookmark Name"
            className="w-auto p-1 border border-gray-300 rounded text-slate-800 text-sm"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 items-center">
          <label htmlFor="searchTag" className="w-1/4">
            Tags
          </label>

          <div>
            <input
              name="searchTag"
              type="search"
              placeholder="Add tag"
              className="w-auto p-1 border border-gray-300 rounded text-slate-800 text-sm"
              value={values.searchTag as string}
              onChange={handleChange}
              onKeyDown={saveTagOnTabKeyPress}
            />
            {loading && <p className="text-sm mt-2">Loading...</p>}
            {(values.searchTag as string) && searchResults.length > 0 && (
              <div className="relative">
                <div className="absolute w-full bg-white border text-slate-800 border-gray-300 rounded mt-2 z-10">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        updateArray('tags', result, 'add');
                        resetResults();
                      }}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(values.tags as string[])?.map((tag, index) => (
            <div
              className="bg-blue-light pl-3 pr-1 py-1 blue-dark rounded-full text-sm flex gap-2"
              key={index}
            >
              <span>{tag}</span>
              <input
                type="button"
                value="x"
                onClick={() => updateArray('tags', tag, 'remove')}
                className="cursor-pointer text-sm text-slate-100 bg-red-700 px-2 rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-end items-center">
          <button
            type="button"
            onClick={handleRemoveBookmark}
            className="w-24 px-3 py-2 rounded-full bg-blue-dark blue-light text-base"
          >
            Remove
          </button>
          <button
            type="submit"
            className="w-24 px-3 py-2 rounded-full bg-blue-light blue-dark text-base"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookmarkForm;
