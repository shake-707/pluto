import fetch from 'node-fetch';

export type OpenLibWork = {
  key: string;
  title: string;
  authors?: {key: string, name: string }[];
  cover_id?: number;
  first_publish_year?: number;
  [key: string]: any;
};

type OpenLibResponse = {
  name: string;
  work_count: number;
  works: OpenLibWork[];
};

export const fetchBooksBySubject = async (
  subject: string,
  limit = 100
): Promise<OpenLibWork[]> => {
  const url: string = `https://openlibrary.org/subjects/${encodeURIComponent(
    subject
  )}.json?limit=${limit}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'pluto(book/magna reviews) james.richards0224@gmail.com',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get books by subject');
  }

  const data: OpenLibResponse = await response.json();

  return data.works;
};
