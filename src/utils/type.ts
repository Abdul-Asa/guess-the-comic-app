// types.ts

export interface RawItem {
  id: any;
  title: any;
  slug: any;
  year: any;
  status: any;
  demographic: any;
  genres: any;
  last_chapter: any;
  md_covers: { b2key: any }[];
  md_titles: any[];
  country: any;
}

export interface DataItem {
  id: any;
  title: any;
  slug: any;
  year: any;
  status: any;
  demographic: any;
  genres: any;
  last_chapter: any;
  imgSrc: any;
  alt_titles: [];
  country: any;
}


export interface VoteItem {
  [key: string]: any;
}

//Choose random comic with higher probability of choosing more popular manhwas
export function getRandomElement(array: any[]) {
  // Error check to ensure array is valid
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  // Generate a random number between 0 and 100
  const random = Math.random() * 100;

  // Set ranges based on the weighted probabilities
  if (random <= 50) {
    // Top 20% of the array
    const index = Math.floor(Math.random() * (array.length * 0.2));
    return array[index];
  } else if (random <= 40) {
    // Next 40% of the array
    const index = Math.floor(
      array.length * 0.2 + Math.random() * (array.length * 0.3)
    );
    return array[index];
  } else {
    // Remaining 10% of the array
    const index = Math.floor(
      array.length * 0.8 + Math.random() * (array.length * 0.2)
    );
    return array[index];
  }
}

export function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
const date = getDate();
