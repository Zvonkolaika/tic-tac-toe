// Initialize the game board

const fields = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
];


// Variable to track if animation has been applied for a cell
const animationApplied = [];

function init() {
    render();
}

let currentPlayer = 'cross'; // Initial player

function render() {
    // Get the container element where the tic-tac-toe grid will be rendered
    const container = document.getElementById('container');

    // Initialize the HTML for the table
    let tableHTML = '<table>';

    // Loop through each row of the tic-tac-toe grid
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>'; // Start a new table row

        // Loop through each column of the current row
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // Calculate the index of the cell in the fields array
            tableHTML += `<td onclick="handleCellClick(${index})"`; // Start a new table cell with an onclick event

            // Check the content of the cell in the fields array
            if (fields[index]) {
                if (fields[index] === 'circle') {
                    tableHTML += `>${generateCircleSVG(index)}</td>`; // If it's a circle, generate the SVG for a circle
                } else if (fields[index] === 'cross') {
                    tableHTML += `>${generateCrossSVG(index)}</td>`; // If it's a cross, generate the SVG for a cross
                }
            } else {
                tableHTML += '></td>'; // If the cell is empty, close the table cell
            }
        }
        tableHTML += '</tr>'; // End the current table row
    }

    tableHTML += '</table>'; // End the table

    // Set the HTML content of the container to the generated table HTML
    container.innerHTML = tableHTML;
}


function checkForWin() {
    // Define the patterns for winning combinations (horizontal, vertical, diagonal)
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    // Iterate through each winning pattern to check for a win
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        // Check if the cells in the pattern have the same non-empty value
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(pattern); // Draw the winning line for this pattern
            return; // Exit the function after a win is detected
        }
    }

    // Check for a draw if there are no empty cells left
    if (!fields.includes('')) {
        alert('It\'s a draw!');
        resetGame(); // Reset the game for a draw
    }
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    // Get the start and end cells for the winning line
    const startCell = document.querySelectorAll('td')[combination[0]];
    const endCell = document.querySelectorAll('td')[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    // Create an SVG element for the winning line
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    // Create a line element for the SVG representing the winning line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${startRect.left + startRect.width / 2}`);
    line.setAttribute('y1', `${startRect.top + startRect.height / 2}`);
    line.setAttribute('x2', `${endRect.left + endRect.width / 2}`);
    line.setAttribute('y2', `${endRect.top + endRect.height / 2}`);
    line.setAttribute('stroke', lineColor);
    line.setAttribute('stroke-width', lineWidth);

    // Append the line to the SVG element
    svg.appendChild(line);
    
    // Append the SVG element to the game container
    document.getElementById('container').appendChild(svg);

    // Delay for a brief moment to ensure the line is visible
    setTimeout(() => {
        // Call resetGame after the line is drawn
        resetGame();
    }, 1000); // Adjust the delay time as needed
}




function resetGame() {
    // Reset fields, animationApplied, and currentPlayer
    fields.fill('');
    animationApplied.fill(false);
    currentPlayer = 'cross';

    // Clear the container and render the initial state
    const container = document.getElementById('container');
    container.innerHTML = '';
    render();
}


function handleCellClick(index) {
    if (!fields[index] && !animationApplied[index]) {
        console.log('Clicked on cell:', index);
        console.log('Current player:', currentPlayer);

        fields[index] = currentPlayer;
        console.log('Updated fields:', fields);

        render();

        // Toggle player for the next turn
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
        console.log('Next player:', currentPlayer);

        // Mark that animation has been applied for this cell
        animationApplied[index] = true;

        // Check for a win
        checkForWin();
    }
}

function generateCircleSVG(index) {
    const width = '70px';
    const height = '70px';
    const circleColor = '#00B0F0';
    const radius = 25;

    return `
        <svg id="circle-${index}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="${radius}" fill="transparent" stroke="${circleColor}" stroke-width="3">
                ${animationApplied[index] && fields[index] === 'circle' ? '' : `<animate attributeName="r" from="0" to="${radius}" dur="0.5s" fill="freeze" />`}
            </circle>
        </svg>
    `;
}

function generateCrossSVG(index) {
    const width = '70px';
    const height = '70px';
    const crossColor = '#FFC000';

    let animation = '';
    if (!animationApplied[index]) {
        animation = `
            <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze" />
        `;
        // Mark that animation has been applied for this cell
        animationApplied[index] = true;
    }

    return `
        <svg id="cross-${index}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" data-index="${index}">
            <line x1="10" y1="10" x2="60" y2="60" stroke="${crossColor}" stroke-width="8">
                ${animation}
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="${crossColor}" stroke-width="8">
                ${animation}
            </line>
        </svg>
    `;
}



