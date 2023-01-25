import dictionary from './wordlist.json'

const sizeOfDictonary = dictionary.length;

// converts unsigned ints to dictonary phrases
const toPhrase = (i) => {
  let n = i;
  let phrase = "";

  while (n > 0) {
    const r = n % sizeOfDictonary;
    n = (n - r) / sizeOfDictonary;
    phrase = `${phrase}-${dictionary[r]}`;
  }

  return phrase.substr(1);
};

// returns the number for a given dictonary phrase
const fromPhrase = (p) => {
  const parts = p.toUpperCase().split("-");
  let n = 0;
  parts.forEach(
    (k, i) => (n += dictionary.indexOf(k) * Math.pow(sizeOfDictonary, i))
  );
  return n;
};

export { toPhrase, fromPhrase };
