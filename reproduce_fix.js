// Test with 13 matches - Fix Logic
const matches = Array(13).fill({}).map((_, i) => ({ matchNumber: i + 1 }));
const sortedMatches = matches.sort((a, b) => a.matchNumber - b.matchNumber);
const count = sortedMatches.length;

// Find next power of 2
let nextPowerOf2 = 2;
while (nextPowerOf2 <= count) {
    nextPowerOf2 *= 2;
}

let roundMatchesCount = nextPowerOf2 / 2;
let startIndex = 0;
let rounds = [];
let loopCount = 0;

console.log('Count:', count);
console.log('Next Power of 2 (Implied Teams):', nextPowerOf2);
console.log('Initial Round Size:', roundMatchesCount);

while (startIndex < count && roundMatchesCount >= 1) {
    loopCount++;
    if (loopCount > 100) {
        console.log('Infinite loop detected!');
        break;
    }

    console.log(`Iteration ${loopCount}: startIndex=${startIndex}, roundMatchesCount=${roundMatchesCount}`);

    // Take matches for this round
    const roundMatches = sortedMatches.slice(startIndex, startIndex + roundMatchesCount);
    rounds.push(roundMatches);
    
    startIndex += roundMatchesCount;
    roundMatchesCount = roundMatchesCount / 2;
}

console.log('Rounds generated:', rounds.length);
console.log('Final startIndex:', startIndex);
