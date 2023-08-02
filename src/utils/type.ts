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
}
//Choose random manwhas with higher probability of choosing more popular manhwas
export function getRandomElement(array: string | any[]) {
  // Error check to ensure array is valid
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  // Generate a random number between 0 and 100
  const random = Math.random() * 100;

  // Set ranges based on the weighted probabilities
  if (random <= 50) {
    // Top 20% of the array
    const index = Math.floor(Math.random() * (array.length * 0.074)); // top 200 of 2700 is about 7.4%
    return array[index];
  } else if (random <= 90) {
    // Next 30% of the array
    const index = Math.floor(
      array.length * 0.074 + Math.random() * (array.length * 0.111)
    ); // top 300 of 2700 is about 11.1%
    return array[index];
  } else if (random <= 95) {
    // Next 30% of the array
    const index = Math.floor(
      array.length * 0.185 + Math.random() * (array.length * 0.296)
    ); // top 800 of 2700 is about 29.6%
    return array[index];
  } else {
    // Remaining 20% of the array
    const index = Math.floor(
      array.length * 0.481 + Math.random() * (array.length * 0.519)
    ); // top 1400 of 2700 is about 51.9%
    return array[index];
  }
}
