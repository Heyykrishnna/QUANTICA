// Test with 6 matches (should be 7 for 8 teams)
const matches = Array(6).fill({}).map((_, i) => ({ matchNumber: i + 1 }));

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

    // If roundSize becomes < 1 but startIndex < count, we have an infinite loop
    if (roundSize < 1) {
         console.log('Error: roundSize < 1, infinite loop imminent');
         break;
    }

    const roundMatches = sortedMatches.slice(startIndex, startIndex + roundSize);
    rounds.push(roundMatches);
    startIndex += roundSize;
    roundSize = roundSize / 2;
}

console.log('Rounds generated:', rounds.length);
