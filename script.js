const fields = [
    null,
    'circle',
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null
];

function init() {
    render();
}

function generateCircleSVG(index) {
    const width = '70px';
    const height = '70px';
    const circleColor = '#00B0F0';

    return `
        <svg id="circle-${index}" width="${width}" height="${height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" data-index="${index}">
            <circle cx="35" cy="35" r="0" fill="none" stroke="${circleColor}" stroke-width="3">
                <animate id="animate-${index}" attributeName="r" from="0" to="30" dur="0.3s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG(index) {
    const width = '70px';
    const height = '70px';
    const crossColor = '#FFC000';

    return `
        <svg id="cross-${index}" width="${width}" height="${height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" data-index="${index}" style="opacity: 0;">
            <line x1="10" y1="10" x2="60" y2="60" stroke="${crossColor}" stroke-width="8">
                <animate attributeName="x2" values="60;40;60" dur="0.3s" repeatCount="1" />
                <animate attributeName="y2" values="60;40;60" dur="0.3s" repeatCount="1" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="${crossColor}" stroke-width="8">
                <animate attributeName="x2" values="10;30;10" dur="0.3s" repeatCount="1" />
                <animate attributeName="y2" values="60;40;60" dur="0.3s" repeatCount="1" />
            </line>
            <line x1="10" y1="10" x2="60" y2="60" stroke="${crossColor}" stroke-width="8">
                <animateTransform attributeName="transform" type="rotate" values="0 35 35;45 35 35;0 35 35" dur="0.3s" repeatCount="1" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="${crossColor}" stroke-width="8">
                <animateTransform attributeName="transform" type="rotate" values="0 35 35;45 35 35;0 35 35" dur="0.3s" repeatCount="1" />
            </line>
            <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" />
        </svg>
    `;
}







function render() {
    const container = document.getElementById('container');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHTML += '<td';

            if (fields[index]) {
                if (fields[index] === 'circle') {
                    // Render circle using generateCircleSVG
                    tableHTML += `>${generateCircleSVG(index)}</td>`;
                } else if (fields[index] === 'cross') {
                    // Render cross using generateCrossSVG
                    tableHTML += `>${generateCrossSVG(index)}</td>`;
                } else {
                    tableHTML += ` class="${fields[index]}"></td>`;
                }
            } else {
                tableHTML += '></td>';
            }
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}




