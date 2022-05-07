// const dayStart = "07:30";
// const dayEnd = "17:45";

// function scheduleMeeting(startTime,durationMinutes) {
//     const cut1 = startTime(-2);
//     console.log(cut1);
// }

// scheduleMeeting("7:00",15);     // false
// scheduleMeeting("07:15",30);    // false
// scheduleMeeting("7:30",30);     // true
// scheduleMeeting("11:30",60);    // true
// scheduleMeeting("17:00",45);    // true
// scheduleMeeting("17:30",30);    // false
// scheduleMeeting("18:00",15);    // false


// Problem 2

// function filterStopWords(arrayToFilter) {
    
// }

// stopWords = new Array[
// "About",

// "Actually",

// "Almost",

// "Also",

// "Although",

// "Always",

// "Am",

// "An",

// "And",

// "Any",

// "Are",

// "As",

// "At",

// "Be",

// "Became",

// "Become",

// "But",

// "By",

// "Can",

// "Could",

// "Did",

// "Do",

// "Does",

// "Each",

// "Either",

// "Else",

// "For",

// "From",

// "Had",

// "Has",

// "Have",

// "Hence",

// "How",

// "I",

// "If",

// "In",

// "IS",

// "IT",

// "ITS",

// "JUST",

// "MAY",

// "MAYBE",

// "Me",

// "Might",

// "Mine",

// "Must",

// "My",

// "Mine",

// "Must",

// "My",

// "Neither",

// "Nor",

// "Not",

// "Of",

// "Oh",

// "Ok",

// "The",

// "When",

// "Where",

// "Whereas",

// "Wherever",

// "Whenever",

// "Whether",

// "Which",

// "While",

// "Who",

// "Whom",

// "Whoever",

// "Whose",

// "Why",

// "Will",

// "With",

// "Within",

// "Without",

// "Would",

// "Yes",

// "Yet",

// "You",

// "Your"
// ]

// filterStopWords(['and','the','of','best']);     // ['best']
// filterStopWords(['brother','hayes','class','is','the','best']);    // ['brother','hayes','class','best']
// filterStopWords(['and']); // []

// Problem 3

// Write an example of using an arrow function that will take an array and
// a percentage and multiply each item in the array by a percentage .06.



const arr = [1, 2, 3]; 
// const squares = arr.map(x => x * x); 
// // Traditional function expression: 
// const squares = arr.map(function (x) { return x * x });

const discountedItems = arr.map(x => x * .06);
console.log(discountedItems);