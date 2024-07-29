import React from 'react';

interface FormValues {
  [key: string]: string | string[];
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormProps {
  initialValues: FormValues;
  validate?: (values: FormValues) => FormErrors;
  onSubmit: (values: FormValues) => void;
  searchMethod?: (query: string) => Promise<string[]>;
}

const useForm = ({
  initialValues,
  validate,
  onSubmit,
  searchMethod,
}: UseFormProps) => {
  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const debounceTimeout = React.useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const debounce = (func: (...args: string[]) => void, delay: number) => {
    return (...args: string[]) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const updateInitialValues = (newInitialValues: FormValues) => {
    setValues({ ...values, ...newInitialValues });
    setErrors({});
    setSearchResults([]);
    setLoading(false);
  };

  const handleSearch = async (value: string) => {
    if (!searchMethod) return;
    setLoading(true);
    try {
      const results = await searchMethod(value);
      setSearchResults([...results, value]);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetResults = () => setSearchResults([]);

  const debouncedSearch = debounce(handleSearch, 200);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (searchMethod && name.includes('search') && value) {
      debouncedSearch(value);
    }
  };

  const resetValue = (name: string) => setValues({ ...values, [name]: '' });

  const updateArray = (
    name: string,
    item: string,
    action: 'add' | 'remove'
  ) => {
    setValues((prevValues) => {
      const currentValue = prevValues[name];

      const isArray = Array.isArray(currentValue);

      if (isArray) {
        const newValues = {
          ...prevValues,
          [name]:
            action === 'add'
              ? Array.from(new Set([...currentValue, item]))
              : currentValue.filter((i) => i !== item),
        };
        return newValues;
      }
      return prevValues;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    errors,
    handleChange,
    handleSubmit,
    loading,
    resetResults,
    resetValue,
    searchResults,
    updateArray,
    updateInitialValues,
    values,
  };
};

export default useForm;
