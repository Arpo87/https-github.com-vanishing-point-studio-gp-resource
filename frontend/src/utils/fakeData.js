const createRandomArray = (length, min, max) => {
  const array = []
  for (let i = 0; i < length; i++) {
    array.push(min + Math.floor((max - min) * Math.random()))
  }
  return array
}

export const labels = {
  income: ['Grants', 'Fundraising', 'Other'],
  expenses: ['Campaigns', 'Campaign Support', 'Contributions', 'Organisational Support'],
  staff: ['Campaigns', 'Campaign Support', 'Fundraising', 'Organisational Support'],
}

export const data = [
  { location: 'Africa', income: [5170, 0, 5] },
  { location: 'Andino', income: [0, 7823, 168] },
  { location: 'Aus Pac', income: [285, 6734, 63] },
  { location: 'Belgium', income: [0, 7644, 180] },
  { location: 'Brazil', income: [6260, 2715, 114] },
  { location: 'Canada', income: [482, 3580, 3] },
  { location: 'CEE', income: [1467, 8052, 4] },
  { location: 'Czech', income: [93, 403, 0] },
  { location: 'East Asia', income: [14441, 13559, 10] },
  { location: 'EU', income: [2100, 0, 0] },
  { location: 'Fr-Lux', income: [0, 15884, 26] },
  { location: 'Germany', income: [0, 46361, 413] },
  { location: 'Greece', income: [0, 844, 1] },
  { location: 'Italy', income: [140, 4911, 0] },
  { location: 'Japan', income: [1142, 691, 1] },
  { location: 'MENA', income: [779, 6, 0] },
  { location: 'Mexico', income: [0, 2434, 56] },
  { location: 'Nordic', income: [0, 14760, 0] },
  { location: 'New Zealand', income: [116, 2844, 13] },
  { location: 'Russia', income: [3820, 2, 0] },
  { location: 'SEA', income: [6205, 1042, 0] },
  { location: 'Spain', income: [0, 9036, 0] },
  { location: 'Switzerland', income: [0, 13934, 24] },
  { location: 'UK', income: [0, 17400, 0] },
  { location: 'USA', income: [971, 19563, 263] },
].map(d => ({ ...d, expenses: createRandomArray(4, 0, 20000), staff: createRandomArray(4, 0, 100) }))

export const mapCoordinates = {
  Africa: [0.551, 0.542],
  Andino: [0.272, 0.805],
  'Aus Pac': [0.903, 0.723],
  Brazil: [0.322, 0.687],
  Canada: [0.181, 0.175],
  CEE: [0.598, 0.279],
  'Fr-Lux': [0.466, 0.235],
  Germany: [0.513, 0.243],
  Japan: [0.893, 0.293],
  Mexico: [0.174, 0.479],
  MENA: [0.528, 0.407],
  Nordic: [0.517, 0.133],
  'New Zealand': [0.985, 0.79],
  Russia: [0.596, 0.155],
  SEA: [0.788, 0.484],
  Spain: [0.467, 0.308],
  Switzerland: [0.502, 0.263],
  UK: [0.472, 0.162],
  USA: [0.179, 0.317],
}

export const traversalOrder = [
  'Canada',
  'USA',
  'Mexico',
  'Brazil',
  'Andino',
  'UK',
  'Nordic',
  'Fr-Lux',
  'Germany',
  'Switzerland',
  'Spain',
  'Russia',
  'CEE',
  'MENA',
  'Africa',
  'SEA',
  'Japan',
  'Aus Pac',
  'New Zealand',
]
