export function formatDate(input) {
    const date = input instanceof Date ? input : input.toDate?.() ?? new Date(input);

    if (isNaN(date)) return '';

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export function extractType(filetype){
    if(filetype.includes('image')) return 'img';
    else if(filetype.includes('video')) return 'video';
    else if(filetype.includes('pdf')) return 'pdf';
    else if(filetype.includes('wordprocessing')) return 'docx';
    else if(filetype.includes('spreadsheet')) return 'excel';
    else if(filetype.includes('powerpoint')) return 'ppt';
    else if(filetype.includes('audio')) return 'audio';
    else return 'other';
}