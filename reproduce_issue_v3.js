// Test with 13 matches (weird number)
const matches = Array(13).fill({}).map((_, i) => ({ matchNumber: i + 1 }));

const sortedMatches = matches.sort((a, b) => a.matchNumber - b.matchNumber);
const count = sortedMatches.length;

let roundSize = (count + 1) / 2;
if (!Number.isInteger(roundSize)) {
    roundSize = Math.ceil(count / 2);
}

console.log('Count:', count);
console.log('Initial Round Size:', roundSize);

let startIndex = 0;
let rounds = [];
let loopCount = 0;

while (startIndex < count) {
    loopCount++;
    if (loopCount > 100) {
        console.log('Infinite loop detected!');
        break;
    }

    console.log(`Iteration ${loopCount}: startIndex=${startIndex}, roundSize=${roundSize}`);

    if (roundSize < 1) {
         console.log('Error: roundSize < 1, infinite loop imminent');
         break;
    }

    // Force roundSize to be integer if it becomes fractional
    // The original code: roundSize = roundSize / 2; 
    // If roundSize becomes 3.5, slice might behave weirdly or loop might not terminate correctly?
    // Actually slice handles fractional step fine (it floors arguments usually?), but logic might be off.
    
    const roundMatches = sortedMatches.slice(startIndex, startIndex + roundSize);
    rounds.push(roundMatches);
    startIndex += roundSize;
    roundSize = roundSize / 2;
}

console.log('Rounds generated:', rounds.length);
